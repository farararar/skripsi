<?php

namespace App\Http\Controllers;

use App\Model\Account;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Model\Journal;
use Carbon\Carbon;
use App\Model\DailyJReview as DJReview;
use App\Model\MonthlyJReview as MJReview;
use App\Model\Ledger;
use App\User;
use stdClass;

class JournalController extends Controller
{
    public function daily($date)
    {
        $data = Journal::with('account')->where('date', $date)->get();
        $check_review = DJReview::select('memo', 'reviewer_id', 'review_date')->where('transaction_date', $date)->first();

        if(count($data) == 0 ) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            if($check_review == null) 
            {
                $review = new stdClass;
            } else {
                $review = $check_review;
                $user = User::find($review->reviewer_id);
                $review->reviewer = $user->name;
            }
            $review->status = "Sudah Review Harian";
            $total_debit = 0;
            $total_credit = 0;
            foreach ($data as $journal) {
                if($journal->djreview_id == NULL)
                {
                    $journal->review_harian = 0;
                    $review->status = "Review Baru Sebagian";
                } else {
                    $journal->review_harian = 1;
                    $review->status = "Sudah Review Harian";
                }
                $total_debit += $journal->debit;
                $total_credit += $journal->credit;
            }
            if($check_review == null) 
            {
                $review->memo = "-";
                $review->status = "Belum Review Harian";
                $review->reviewer_id = null;
                $review->review_date = null;
                $review->reviewer = null;
            }
            $additional_data = array(
                                "total_debit" => $total_debit,
                                "total_credit" => $total_credit,
                                "review" => $review
                            );
            
            $response = createResponse(true, 200, "Journal has been successfully retrieved", $data, $additional_data);  
        }
        return response()->json($response);
    }

    public function monthly($year, $month)
    {
        // $count_not_reviewed = Journal::where('date', 'LIKE', '%'.$year.'-'.$month.'%')->where('djreview_id', null)->count();
        // if($count_not_reviewed > 1) {
        //     $response = createResponse(false, 500, "Ada jurnal yang belum review harian, silahkan review terlebih dahulu"); 
        //     return response()->json($response);
        // }

        $data = Journal::with('account')->where('date', 'LIKE', '%'.$year.'-'.$month.'%')->get();
        $check_review = DJReview::select('memo', 'reviewer_id', 'review_date')->where('transaction_date', 'LIKE', '%'.$year.'-'.$month.'%')->first();
        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            if($check_review == null) 
            {
                $review = new stdClass;
            } else {
                $review = $check_review;
                $user = User::find($review->reviewer_id);
                $review->reviewer = $user->name;
            }
            $total_debit = 0;
            $total_credit = 0;
            foreach ($data as $journal) {
                if($journal->djreview_id == NULL)
                {
                    $journal->review_harian = 0;
                } else {
                    $journal->review_harian = 1;
                }
                $total_debit += $journal->debit;
                $total_credit += $journal->credit;
            }
            if($check_review == null) 
            {
                $review->memo = "-";
                $review->status = "Belum Review Harian";
                $review->reviewer_id = null;
                $review->review_date = null;
                $review->reviewer = null;
            }
            $additional_data = array(
                                "total_debit" => $total_debit,
                                "total_credit" => $total_credit,
                                "review" => $review
                            );
            
            $response = createResponse(true, 200, "Journal has been successfully retrieved", $data, $additional_data);  
        }
        return response()->json($response);

    }

    public function store(Request $request)
    {
        $debit = $request->debit;
        $credit = $request->credit;
        if(!is_numeric($debit)) {
            $debit = 0;
        }
        if(!is_numeric($credit)) {
            $credit = 0;
        }

        if($debit > 0 && $credit > 0)
        {
            $response = createResponse(false, 400, "Isi satu saja, kredit atau debit");  
            return response()->json($response);
        }

        if($debit == 0 && $credit == 0)
        {
            $response = createResponse(false, 400, "Debit atau Kredit harus terisi salah satunya");  
            return response()->json($response);
        }

        $journal = new Journal;
        $journal->account_id = $request->account_id;
        $journal->invoice_number = $request->invoice_number;
        $journal->debit = $debit;
        $journal->credit = $credit;
        $journal->description = $request->description;
        $journal->date = $request->date;
        $journal->save();

        $response = createResponse(true, 201, "Journal has been successfully created");  

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $journal = Journal::find($id);
        $journal->account_id = $request->account_id;
        $journal->invoice_number = $request->invoice_number;
        $journal->debit = $request->debit;
        $journal->credit = $request->credit;
        $journal->description = $request->description;
        $journal->date = $request->date;
        $journal->save();

        $response = createResponse(true, 201, "Journal has been successfully updated");  

        return response()->json($response);
    }

    public function delete($id)
    {
        $journal = Journal::find($id);
        $journal->delete();

        $response = createResponse(true, 200, "Journal has been successfully deleted");  

        return response()->json($response);
    }


    public function reviewDaily(Request $request)
    {
        $status = "Sudah Review Harian";
        $date = $request->date;

        $data = Journal::where('date', $date)->get();
        $review = DJReview::where('transaction_date', $date)->first();

        if($review == null) {
            $review = new DJReview;
            $review->transaction_date = $date;
        }
        $review->memo = $request->memo;
        $review->reviewer_id = $request->reviewer_id;
        $review->review_date = date('Y-m-d');
        $review->save();

        foreach ($data as $journal) {
            $journal->djreview_id = $review->id;
            $journal->status = $status;
            $journal->save();
        }

        $response = createResponse(true, 200, "Journal has been successfully reviewed"); 
        return response()->json($response);
    }

    public function reviewMonthly(Request $request)
    {
        $status = "Sudah Review Bulanan";
        $year = $request->year;
        $month = $request->month;

        $data = Journal::where('date', 'LIKE', '%'.$year.'-'.$month.'%')->get();
        $review = MJReview::where('year', $year)->where('month', $month)->first();

        if($review == null) {
            $review = new MJReview;
            $review->year = $year;
            $review->month = $month;
        }
        $review->memo = $request->memo;
        $review->reviewer_id = $request->reviewer_id;
        $review->review_date = date('Y-m-d');
        $review->save();

        foreach ($data as $journal) {
            $journal->mjreview_id = $review->id;
            $journal->status = $status;
            $journal->save();
        }
        
        $response = createResponse(true, 200, "Journal has been successfully reviewed"); 
        return response()->json($response);
    }

    public function posting(Request $request)
    {
        $status = "Sudah Posting";
        $year = $request->year;
        $month = $request->month;
        $count_not_reviewed = Journal::where('date', 'LIKE', '%'.$year.'-'.$month.'%')->count();

        if($count_not_reviewed > 1) {
            $response = createResponse(false, 500, "Ada jurnal yang belum review bulanan, silahkan review terlebih dahulu"); 
            return response()->json($response);
        }

        $data = Journal::where('date', 'LIKE', '%'.$year.'-'.$month.'%')->get();
        if(count($data) == 0)
        {
            $response = createResponse(false, 404, "Data is Not Available"); 
            return response()->json($response);
        }
        foreach ($data as $journal) 
        {
            $journal->status = $status;
            $journal->save();
            
            $ledger = Ledger::where('journal_id', $journal->id)->first();
            if($ledger == null) {
                $ledger = new Ledger;
                $ledger->journal_id = $journal->id;
            }
            $ledger->account_id = $journal->account_id;
            $ledger->posting_date = date('Y-m-d');
            $ledger->save();
        }
        
        $response = createResponse(true, 200, "Journal has been successfully posted"); 
        return response()->json($response);
    }

}
