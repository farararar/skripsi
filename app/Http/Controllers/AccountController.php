<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Model\Account;
use App\Model\Journal;
use App\Model\Ledger;

class AccountController extends Controller
{
    public function index()
    {
        $data = Account::orderBy('name', 'asc')->get();
        
        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $response = createResponse(true, 200, "Accounts has been successfully retrieved", $data); 
        }
        return response()->json($response);
    }

    public function get($id)
    {
        $data = Account::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $response = createResponse(true, 200, "Account has been successfully retrieved", $data); 
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $isItNotValid = $this->isItNotValid($request);
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        $data = new Account;
        $data->reference_number = $request->reference_number;
        $data->name = $request->name;
        $data->information = $request->information;
        $data->save();
        $response = createResponse(true, 201, "Account has been successfully stored", $data); 
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $isItNotValid = $this->isItNotValid($request);
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        $data = Account::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->reference_number = $request->reference_number;
            $data->name = $request->name;
            $data->information = $request->information;
            $data->save();
            $response = createResponse(true, 200, "Account has been successfully updated", $data); 
        }
        return response()->json($response);
    }

    public function delete($id)
    {
        $data = Account::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->delete();
            $response = createResponse(true, 200, "Account has been successfully deleted", $data); 
        }
        return response()->json($response);
    }

    public function report(Request $request)
    {
        $accounts = Account::orderBy('name', 'asc')->get();
        $total_debit = 0;
        $total_credit = 0;
        foreach ($accounts as $account) {
            $debit = Journal::whereHas('ledger', function($q) use ($request){
                $q->where(function ($q) use ($request) {
                    if($request->since !== null) {
                        $q->where('posting_date', '>=', $request->since);
                    }
                    if($request->until !== null) {
                        $q->where('posting_date', '<=', $request->until);
                    }
                });
            })->where('account_id', $account->id)->sum('debit');
            $credit = Journal::whereHas('ledger', function($q) use ($request){
                $q->where(function ($q) use ($request) {
                    if($request->since !== null) {
                        $q->where('posting_date', '>=', $request->since);
                    }
                    if($request->until !== null) {
                        $q->where('posting_date', '<=', $request->until);
                    }
                });
            })->where('account_id', $account->id)->sum('credit');
            $total_debit += $debit;
            $total_credit += $credit;
            $account->debit = "Rp. ".number_format($debit,0,',','.');
            $account->credit = "Rp. ".number_format($credit,0,',','.');
        }
        $additional_data = array(
            "total_debit" => "Rp. ".number_format($total_debit,0,',','.'),
            "total_credit" => "Rp. ".number_format($total_credit,0,',','.')
        );
        
        if(count($accounts) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $response = createResponse(true, 200, "Accounts has been successfully retrieved", $accounts, $additional_data); 
        }
        return response()->json($response);
    }
    public function isItNotValid($request, $type=null) 
    {
        $rules = array();
        if($request->reference_number == null) {
            $rules += array (
                    'reference_number' => 'required'
                );
        }
        if($request->name == null) {
            $rules += array (
                    'name' => 'required'
                );
        }
        if(count($rules) > 0) {
            $validator = Validator::make([], $rules);
            return $validator->availableErrors();
        }
        return null;
    }

    //
    //
    //buku besar
    public function buku_besar(Request $request)
    {
        $year = $request->tahun;
        $month = $request->bulan;
        $account_id = $request->account_id;

        if(strlen($month) == 1) {
            $month = "0".$month;
        }

        $account = Account::find($account_id);
        $data = array();
        $debit = Journal::where('account_id', $account->id)->where('date', '<', $year.'-'.$month.'-01')->sum('debit');
        $credit = Journal::where('account_id', $account->id)->where('date', '<', $year.'-'.$month.'-01')->sum('credit');
        $saldo = $debit - $credit;
        $data['saldo_awal'] = $saldo;
        $data['daftar'][] = array(
            "Tanggal" => $year.'-'.$month.'-01',
            "Debet" => '-',
            "Kredit" => '-',
            "Saldo Debet" => $saldo >= 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-',
            "Saldo Kredit" => $saldo < 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-'
        );
        $journals = Journal::where('account_id', $account->id)->where('date', 'LIKE', '%'.$year.'-'.$month.'-%')->get();
        foreach ($journals as $journal) {
            $saldo += $journal->debit - $journal->credit;
            $data['daftar'][] = array(
                "Tanggal" => $journal->date,
                "Debet" => $journal->debit > 0 ? 'Rp. '.number_format(abs($journal->debit),0,',','.') : '-',
                "Kredit" => $journal->credit > 0 ? 'Rp. '.number_format(abs($journal->credit),0,',','.') : '-',
                "Saldo Debet" => $saldo >= 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-',
                "Saldo Kredit" => $saldo < 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-'
            );
        }
        $data['saldo_akhir'] = 'Rp. '.number_format($saldo,0,',','.');
        $response = createResponse(true, 200, 'Buku besar berhasil didapatkan', $data);
        return response()->json($response);
    }
    //
    //
    //neraca saldo
    public function neraca_saldo(Request $request)
    {
        $year = $request->tahun;
        $month = $request->bulan;
        
        if(strlen($month) == 1) {
            $month = "0".$month;
        }
        
        $accounts = Account::orderBy('id', 'asc')->get();
        $data = array();
        $total_debit = 0;
        $total_kredit = 0;
        foreach ($accounts as $account) {
            $debit = Journal::where('account_id', $account->id)->where('date', '<', $year.'-'.$month.'-31')->sum('debit');
            $credit = Journal::where('account_id', $account->id)->where('date', '<', $year.'-'.$month.'-31')->sum('credit');
            $saldo = $debit - $credit;
            $data[$account->name]['Debet'] = $saldo >= 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-';
            $data[$account->name]['Kredit'] = $saldo < 0 ? 'Rp. '.number_format(abs($saldo),0,',','.') : '-';
            $total_debit += $saldo >= 0 ? abs($saldo) : 0;
            $total_kredit += $saldo < 0 ? abs($saldo) : 0;
        }
        $data['Total']['Debet'] = 'Rp. '.number_format(abs($total_debit),0,',','.');
        $data['Total']['Kredit'] = 'Rp. '.number_format(abs($total_kredit),0,',','.');
        
        $response = createResponse(true, 200, 'Neraca saldo berhasil didapatkan', $data);
        return response()->json($response);
    }
}
