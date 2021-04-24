<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Model\Outcome;
use Carbon\Carbon;
use App\Model\Journal;

class OutcomeController extends Controller
{
    
    public function index()
    {
        $data = Outcome::with('user')->with('reviewed_by')->orderBy('created_at', 'desc')->paginate(10);
        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            foreach($data as $datum) {
                $datum->date = tanggalIndonesia($datum->date);
                $datum->review_date = tanggalIndonesia($datum->review_date);
            }
            $response = createResponse(true, 200, "Outcomes has been successfully retrieved", $data); 
        }
        return response()->json($response);
    }

    public function get($id)
    {
        $data = Outcome::with('user')->with('reviewed_by')->find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->date = tanggalIndonesia($data->date);
            $data->review_date = tanggalIndonesia($data->review_date);
            $response = createResponse(true, 200, "Outcome has been successfully retrieved", $data); 
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $isItNotValid = $this->isItNotValid($request, 'unique');
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }
        $pm = $request->payment_method;
        $cat = $request->category;
        $type = $request->type;
        $accounts = $this->accountPaymentMethods();
        $debit_account = $accounts[$pm][$cat][$type]['debit_account'];
        $credit_account = $accounts[$pm][$cat][$type]['credit_account'];
        $data = new Outcome;
        $data->user_id = $request->user_id;
        $data->debit_account = $debit_account;
        $data->credit_account = $credit_account;
        $data->shift = $request->shift;
        $data->payment_method = $pm;
        $data->category = $cat;
        $data->type = $type;
        $data->invoice_number = $request->invoice_number;

        $image_name	= time().'_'.rand(100,999).'.png';
        $request->file('image')->move('uploads/images/outcome/', $image_name);
        $data->image = 'uploads/images/outcome/'. $image_name;

        $data->qty = $request->qty;
        $data->unit_price = $request->unit_price;
        $data->ammount = $request->qty * $request->unit_price;
        $data->description = $request->description;
        $data->payment_method = $request->payment_method;
        $data->date = $request->date;
        $data->save();
        $response = createResponse(true, 201, "Outcome has been successfully stored", $data); 
        
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $data = Outcome::with('user')->with('reviewed_by')->find($id);
        if($data->invoice_number == $request->invoice_number) {
            $isItNotValid = $this->isItNotValid($request);
        } else {
            $isItNotValid = $this->isItNotValid($request, 'unique');
        }
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            //$type = str_replace('"','',$request->type);
            $pm = $request->payment_method;
            $cat = $request->category;
            $type = $request->type;
            $accounts = $this->accountPaymentMethods();
            
            $debit_account = $accounts[$pm][$cat][$type]['debit_account'];
            $credit_account = $accounts[$pm][$cat][$type]['credit_account'];
            $data->user_id = $request->user_id;
            $data->debit_account = $debit_account;
            $data->credit_account = $credit_account;
            $data->shift = $request->shift;
            $data->payment_method = $pm;
            $data->category = $cat;
            $data->type = $type;
            $data->invoice_number = $request->invoice_number;
    
            if ($request->hasFile('image')) {
                $image_name	= time().'_'.rand(100,999).'.png';
                $request->file('image')->move('uploads/images/outcome/', $image_name);
                $data->image = 'uploads/images/outcome/'. $image_name;
            }
    
            $data->qty = $request->qty;
            $data->unit_price = $request->unit_price;
            $data->ammount = $request->qty * $request->unit_price;
            $data->description = $request->description;
            $data->payment_method = $request->payment_method;
            $data->date = $request->date;
            $data->save();
            
            $data->date = tanggalIndonesia($data->date);
            $data->review_date = tanggalIndonesia($data->review_date);

            $response = createResponse(true, 200, "Outcome has been successfully updated", $data); 
        }
        return response()->json($response);
    }

    public function review(Request $request, $id)
    {
        $status = $request->review_status;
        if($status !== 'approved' && $status !== 'rejected') {
            $response = createResponse(false, 400, "Review status has to be either 'approved' or 'rejected' (case sensitive)"); 
            return response()->json($response);
        }
        $data = Outcome::with('user')->with('reviewed_by')->find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $now = Carbon::now();
            $data->review_status = $status;
            $data->reviewer_id = $request->reviewer_id;
            $data->review_date = date('Y-m-d H:i:s', strtotime($now));
            $data->save();

            $debit = new Journal;
            $debit->account_id = $data->debit_account;
            $debit->invoice_number = $data->invoice_number;
            $debit->debit = $data->ammount;
            $debit->credit = 0;
            $debit->description = $data->description;
            $debit->date = $data->date;
            $debit->save();

            $credit = new Journal;
            $credit->account_id = $data->credit_account;
            $credit->invoice_number = $data->invoice_number;
            $credit->debit = 0;
            $credit->credit = $data->ammount;
            $credit->description = $data->description;
            $credit->date = $data->date;
            $credit->save();

            $data = Outcome::with('user')->with('reviewed_by')->find($id);
            $response = createResponse(true, 200, "Outcome has been successfully reviewed", $data); 
        }
        return response()->json($response);
    }


    public function delete($id)
    {
        $data = Outcome::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->delete();
            $response = createResponse(true, 200, "Outcome has been successfully deleted"); 
        }
        return response()->json($response);
    }
    
    public function isItNotValid($request, $type=null) 
    {
        $rules = array();
        $invoice_number = $request->invoice_number;
        if ($type == 'unique') {
            $existingInvoice = Outcome::where('invoice_number', $invoice_number)->get();
            if(count($existingInvoice) > 0) {
                $rules += array (
                        'invoice_number' => 'unique'
                    );
            }
        }
        if($invoice_number == null) {
            $rules += array (
                    'invoice_number' => 'required'
                );
        }
        if($request->shift == null) {
            $rules += array (
                    'shift' => 'required'
                );
        }
        if($request->payment_method == null) {
            $rules += array (
                    'payment_method' => 'required'
                );
        }
        if($request->category == null) {
            $rules += array (
                    'category' => 'required'
                );
        }
        if($request->type == null) {
            $rules += array (
                    'type' => 'required'
                );
        }
        if($request->date == null) {
            $rules += array (
                    'date' => 'required'
                );
        }
        if(!is_numeric($request->unit_price)) {
            $rules += array (
                    'unit_price' => 'numeric'
                );
        }
        if(!is_numeric($request->qty)) {
            $rules += array (
                    'qty' => 'numeric'
                );
        }
        if(count($rules) > 0) {
            $validator = Validator::make([], $rules);
            return $validator->availableErrors();
        }
        return null;
    }

    public function getPaymentMethods()
    {
        $data = array("Tunai", "Kredit", "Pembayaran Utang");
        $response = createResponse(true, 200, "Pick one payment method", $data);
        return response()->json($response);
    }

    public function getJenisOperasional()
    {
        $response = createResponse(true, 200, "Pick one outcome type", getJenisOperasional());
        return response()->json($response);
    }

    public function getJenisLogistik()
    {
        $response = createResponse(true, 200, "Pick one outcome type", getJenisLogistik());
        return response()->json($response);
    }

    private function accountPaymentMethods()
    {
        return array(
            "Tunai" => array(
                "Operasional" => array(
                    "Tagihan listrik" => array(
                        "debit_account" => 34,
                        "credit_account" => 1
                    ),
                    "Tagihan air" => array(
                        "debit_account" => 35,
                        "credit_account" => 1
                    ),
                    "Tagihan telfon" => array(
                        "debit_account" => 36,
                        "credit_account" => 1
                    ),
                    "Tagihan internet" => array(
                        "debit_account" => 37,
                        "credit_account" => 1
                    ),
                    "Sewa gedung" => array(
                        "debit_account" => 26,
                        "credit_account" => 1
                    ),
                    "Sewa pabrik" => array(
                        "debit_account" => 27,
                        "credit_account" => 1
                    ),
                    "Biaya asuransi" => array(
                        "debit_account" => 29,
                        "credit_account" => 1
                    ),
                    "Alat tulis kantor" => array(
                        "debit_account" => 45,
                        "credit_account" => 1
                    ),
                    "Pengadaan furniture" => array(
                        "debit_account" => 43,
                        "credit_account" => 1
                    ),
                    "Pengadaan kendaraan" => array(
                        "debit_account" => 21,
                        "credit_account" => 1
                    ),
                    "Pengadaan elektronik" => array(
                        "debit_account" => 41,
                        "credit_account" => 1
                    ),
                    "Gaji pegawai perusahaan" => array(
                        "debit_account" => 31,
                        "credit_account" => 1
                    ),
                    "Pemeliharaan gedung" => array(
                        "debit_account" => 32,
                        "credit_account" => 1
                    ),
                    "Pemeliharaan kendaraan" => array(
                        "debit_account" => 33,
                        "credit_account" => 1
                    ),
                    "Iklan dan pemasaran" => array(
                        "debit_account" => 28,
                        "credit_account" => 1
                    ),
                    "Pengadaan mesin pabrik" => array(
                        "debit_account" => 19,
                        "credit_account" => 1
                    ),
                    "Pengadaan gedung kantor/pabrik" => array(
                        "debit_account" => 17,
                        "credit_account" => 1
                    ),
                    "Akumulasi penyusutan mesin" => array(
                        "debit_account" => 20,
                        "credit_account" => 1
                    ),
                    "Akumulasi penyusutan gedung" => array(
                        "debit_account" => 18,
                        "credit_account" => 1
                    ),
                    "Akumulasi penyusutan kendaraan" => array(
                        "debit_account" => 22,
                        "credit_account" => 1
                    ),
                    "Biaya Lain-Lain" => array(
                        "debit_account" => 38,
                        "credit_account" => 1
                    ),
                ),
                "Logistik" => array(
                    "Pembelian bahan baku langsung" => array(
                        "debit_account" => 23,
                        "credit_account" => 1
                    ),
                    "Pembeliaan bahan baku pembantu" => array(
                        "debit_account" => 24,
                        "credit_account" => 1
                    ),
                    "Gaji tenaga kerja tidak langsung" => array(
                        "debit_account" => 16,
                        "credit_account" => 1
                    ),
                    "Reparasi & pemeliharaan mesin pabrik" => array(
                        "debit_account" => 46,
                        "credit_account" => 1
                    ),
                    "Reparasi & pemeliharaan gedung pabrik" => array(
                        "debit_account" => 50,
                        "credit_account" => 1
                    ),
                    "Reparasi & pemeliharaan kendaraan" => array(
                        "debit_account" => 51,
                        "credit_account" => 1
                    ),
                    "Biaya angkut pembelian bahan baku" => array(
                        "debit_account" => 25,
                        "credit_account" => 1
                    ),
                    "Tagihan listrik pabrik" => array(
                        "debit_account" => 48,
                        "credit_account" => 1
                    ),
                    "Tagihan air  pabrik" => array(
                        "debit_account" => 49,
                        "credit_account" => 1
                    ),
                    "Biaya administrasi pabrik" => array(
                        "debit_account" => 45,
                        "credit_account" => 1
                    ),
                    "Pajak bumi & bangunan" => array(
                        "debit_account" => 47,
                        "credit_account" => 1
                    ),
                    "Penyusutan mesin dan peralatan pabrik" => array(
                        "debit_account" => 20,
                        "credit_account" => 1
                    ),
                    "Biaya BOP lain-lain" => array(
                        "debit_account" => 51,
                        "credit_account" => 1
                    ),
                ),
            ),
            "Kredit" => array(
                "Operasional" => array(
                    "Tagihan listrik" => array(
                        "debit_account" => 34,
                        "credit_account" => 8
                    ),
                    "Tagihan air" => array(
                        "debit_account" => 35,
                        "credit_account" => 8
                    ),
                    "Tagihan telfon" => array(
                        "debit_account" => 36,
                        "credit_account" => 8
                    ),
                    "Tagihan internet" => array(
                        "debit_account" => 37,
                        "credit_account" => 8
                    ),
                    "Sewa gedung" => array(
                        "debit_account" => 26,
                        "credit_account" => 8
                    ),
                    "Sewa pabrik" => array(
                        "debit_account" => 27,
                        "credit_account" => 8
                    ),
                    "Biaya asuransi" => array(
                        "debit_account" => 29,
                        "credit_account" => 8
                    ),
                    "Alat tulis kantor" => array(
                        "debit_account" => 45,
                        "credit_account" => 8
                    ),
                    "Pengadaan furniture" => array(
                        "debit_account" => 43,
                        "credit_account" => 8
                    ),
                    "Pengadaan kendaraan" => array(
                        "debit_account" => 21,
                        "credit_account" => 8
                    ),
                    "Pengadaan elektronik" => array(
                        "debit_account" => 41,
                        "credit_account" => 8
                    ),
                    "Gaji pegawai perusahaan" => array(
                        "debit_account" => 31,
                        "credit_account" => 8
                    ),
                    "Pemeliharaan gedung" => array(
                        "debit_account" => 32,
                        "credit_account" => 8
                    ),
                    "Pemeliharaan kendaraan" => array(
                        "debit_account" => 33,
                        "credit_account" => 8
                    ),
                    "Iklan dan pemasaran" => array(
                        "debit_account" => 28,
                        "credit_account" => 8
                    ),
                    "Pengadaan mesin pabrik" => array(
                        "debit_account" => 19,
                        "credit_account" => 8
                    ),
                    "Pengadaan gedung kantor/pabrik" => array(
                        "debit_account" => 17,
                        "credit_account" => 8
                    ),
                    "Akumulasi penyusutan mesin" => array(
                        "debit_account" => 20,
                        "credit_account" => 8
                    ),
                    "Akumulasi penyusutan gedung" => array(
                        "debit_account" => 18,
                        "credit_account" => 8
                    ),
                    "Akumulasi penyusutan kendaraan" => array(
                        "debit_account" => 22,
                        "credit_account" => 8
                    ),
                    "Biaya Lain-Lain" => array(
                        "debit_account" => 38,
                        "credit_account" => 8
                    ),
                ),
                "Logistik" => array(
                    "Pembelian bahan baku langsung" => array(
                        "debit_account" => 23,
                        "credit_account" => 8
                    ),
                    "Pembeliaan bahan baku pembantu" => array(
                        "debit_account" => 24,
                        "credit_account" => 8
                    ),
                    "Gaji tenaga kerja tidak langsung" => array(
                        "debit_account" => 16,
                        "credit_account" => 8
                    ),
                    "Reparasi & pemeliharaan mesin pabrik" => array(
                        "debit_account" => 46,
                        "credit_account" => 8
                    ),
                    "Reparasi & pemeliharaan gedung pabrik" => array(
                        "debit_account" => 50,
                        "credit_account" => 8
                    ),
                    "Reparasi & pemeliharaan kendaraan" => array(
                        "debit_account" => 51,
                        "credit_account" => 8
                    ),
                    "Biaya angkut pembelian bahan baku" => array(
                        "debit_account" => 25,
                        "credit_account" => 8
                    ),
                    "Tagihan listrik pabrik" => array(
                        "debit_account" => 48,
                        "credit_account" => 8
                    ),
                    "Tagihan air  pabrik" => array(
                        "debit_account" => 49,
                        "credit_account" => 8
                    ),
                    "Biaya administrasi pabrik" => array(
                        "debit_account" => 45,
                        "credit_account" => 8
                    ),
                    "Pajak bumi & bangunan" => array(
                        "debit_account" => 47,
                        "credit_account" => 8
                    ),
                    "Penyusutan mesin dan peralatan pabrik" => array(
                        "debit_account" => 20,
                        "credit_account" => 8
                    ),
                    "Biaya BOP lain-lain" => array(
                        "debit_account" => 51,
                        "credit_account" => 8
                    ),
                ),
            ),
            "Pembayaran Utang"  => array(
                "Operasional" => array(
                    "debit_account" => 8,
                    "credit_account" => 1
                ),
                "Logistik" => array(
                    "debit_account" => 8,
                    "credit_account" => 1
                ),
            ),
        );
    }
}
