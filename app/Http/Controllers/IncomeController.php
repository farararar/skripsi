<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Model\Income;
use App\Model\Journal;
use App\Model\StockOpname;
use Carbon\Carbon;
use App\Model\Product;

class IncomeController extends Controller
{

    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $data = Income::with('user')->with('debit_account')->with('credit_account')->with('reviewed_by')
                        ->where(function ($q) use ($keyword) {
                            if($keyword !== null) {
                                $q->where('invoice_number', 'LIKE', '%'.$keyword.'%')
                                    ->orWhere('description', 'LIKE', '%'.$keyword.'%')
                                    ->orWhere('information', 'LIKE', '%'.$keyword.'%');
                            }
                        })->orderBy('created_at', 'desc')->paginate(10);

        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            foreach($data as $datum) {
                $datum->date = tanggalIndonesia($datum->date);
                $datum->review_date = tanggalIndonesia($datum->review_date);
            }
            $response = createResponse(true, 200, "Incomes has been successfully retrieved", $data); 
        }
        return response()->json($response);
    }

    public function invoice($id)
    {
        $data = Income::select('date', 'invoice_number', 'customer')->find($id);
        $stockOpname = StockOpname::with('product')->where('transaction_id', $id)->where('status', 'Penjualan')->get();

        $products = array();
        $grand_total = 0;
        foreach ($stockOpname as $stock) {
            $unit_total = $stock->stock * $stock->product->unit_price;
            $product = array(
                "name" => $stock->product->name,
                "unit_price" => "Rp. ".number_format($stock->product->unit_price,0,',','.'),
                "qty" => $stock->stock,
                "unit_total" => "Rp. ".number_format($unit_total,0,',','.')
            );
            $grand_total += $unit_total;
            $products[] = $product;
        }
        $data->grand_total = "Rp. ".number_format($grand_total,0,',','.');
        $data->products = $products;
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->date = tanggalIndonesia($data->date);
            $response = createResponse(true, 200, "Invoice has been sucessfully generated", $data); 
        }
        return response()->json($response);
    }

    public function get($id)
    {
        $data = Income::with('user')->with('reviewed_by')->find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $stock_opname = StockOpname::where('transaction_id', $id)->where('status', 'Penjualan')->get();
            $this_product = array();
            foreach($stock_opname as $stock) {
                $this_stock = $stock;
                $this_stock->product = $stock->product;
                $this_product[] = $this_stock;
            }
            $data->products = $this_product;
            $data->date = $data->date;
            $data->review_date = $data->review_date;
            $response = createResponse(true, 200, "Income has been successfully retrieved", $data); 
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

        $data = new Income;
        $data->user_id          = $request->user_id;
        $data->customer         = $request->customer;
        // $data->account_id       = $request->account_id;
        $ammount = 0;
        foreach ($request->product as $product_id => $unit) {
            
            $product = Product::where('deleted', 0)->find($product_id);
            $thisAmmount = $product->unit_price * $unit;
            $ammount += $thisAmmount;
            
        }

        $image_name	= time().'_'.rand(100,999).'.png';
        $request->file('image')->move('uploads/images/income/', $image_name);
        $data->image = 'uploads/images/income/'. $image_name;

        $account = $this->accountPaymentMethods();
        $data->debit_account    = $account[$request->payment_method]["debit_account"];
        $data->credit_account   = $account[$request->payment_method]["credit_account"];

        $data->invoice_number   = $request->invoice_number;
        $data->shift            = $request->shift;
        $data->ammount          = $ammount;
        $data->description      = $request->description;
        $data->information      = $request->information;
        $data->payment_method   = $request->payment_method;
        $data->kantor           = $request->kantor;
        $data->date             = $request->date;
        $data->save();

        foreach ($request->product as $product_id => $unit) {
            $stockopname = New StockOpname;
            $stockopname->transaction_id = $data->id;
            $stockopname->product_id = $product_id;
            $stockopname->date = $request->date;
            $stockopname->status = 'Penjualan';
            $stockopname->stock = $unit;
            $stockopname->save();
        }

        $response = createResponse(true, 201, "Income has been successfully stored", $data); 
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $data = Income::find($id);
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

            $data = Income::find($id);
            $data->user_id          = $request->user_id;
            $data->customer         = $request->customer;
            // $data->account_id       = $request->account_id;
            $ammount = 0;
            StockOpname::where('transaction_id', $id)->where('status', 'Penjualan')->delete();
            foreach ($request->product as $product_id => $unit) {
                
                $product = Product::where('deleted', 0)->find($product_id);
                $thisAmmount = $product->unit_price * $unit;
                $ammount += $thisAmmount;
                
                $stockopname = new StockOpname;
                $stockopname->transaction_id = $id;
                $stockopname->product_id = $product_id;
                $stockopname->date = $request->date;
                $stockopname->status = 'Penjualan';
                $stockopname->stock = $unit;
                $stockopname->save();
            }
            if ($request->hasFile('image')) {
                $image_name	= time().'_'.rand(100,999).'.png';
                $request->file('image')->move('uploads/images/income/', $image_name);
                $data->image = 'uploads/images/income/'. $image_name;
            }
    
            $account = $this->accountPaymentMethods();
            $data->debit_account    = $account[$request->payment_method]["debit_account"];
            $data->credit_account   = $account[$request->payment_method]["credit_account"];
    
            $data->invoice_number   = $request->invoice_number;
            $data->shift            = $request->shift;
            $data->ammount          = $ammount;
            $data->description      = $request->description;
            $data->information      = $request->information;
            $data->payment_method   = $request->payment_method;
            $data->kantor           = $request->kantor;
            $data->date             = $request->date;
            $data->save();
    
            $data->date = tanggalIndonesia($data->date);
            $data->review_date = tanggalIndonesia($data->review_date);

            $response = createResponse(true, 200, "Income has been successfully updated", $data); 
        }
        return response()->json($response);
    }

    public function validOrInvalid(Request $request, $id)
    {
        $data = Income::find($id);
        $data->is_valid = $request->is_valid;
        $data->save();
        $msg =  "Income has been successfully ". ($request->is_valid == 1 ? "validated" : "invalidated");

        $response = createResponse(
                    true, 200, 
                    $msg, 
                    $data);

        return response()->json($response);
    }

    public function review(Request $request, $id)
    {
        $status = $request->review_status;
        if($status !== 'approved' && $status !== 'rejected') {
            $response = createResponse(false, 400, "Review status has to be either 'approved' or 'rejected' (case sensitive)"); 
            return response()->json($response);
        }

        $data = Income::with('reviewed_by')->find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $now = Carbon::now();
            $data->review_status = $status;
            $data->reviewer_id = $request->reviewer_id;
            $data->review_date = date('Y-m-d H:i:s', strtotime($now));
            $data->review = $request->review;
            $data->save();

            $debit = new Journal;
            $debit->account_id = $data->debit_account;
            $debit->invoice_number = $data->invoice_number;
            $debit->debit = $data->ammount;
            $debit->credit = 0;
            $debit->kantor = $data->kantor;
            $debit->description = $data->description;
            $debit->date = $data->date;
            $debit->save();

            $credit = new Journal;
            $credit->account_id = $data->credit_account;
            $credit->invoice_number = $data->invoice_number;
            $credit->debit = 0;
            $credit->credit = $data->ammount;
            $credit->kantor = $data->kantor;
            $credit->description = $data->description;
            $credit->date = $data->date;
            $credit->save();

            $data = Income::with('user')->with('reviewed_by')->find($id);

            $data->date = tanggalIndonesia($data->date);
            $data->review_date = tanggalIndonesia($data->review_date);
            
            $response = createResponse(true, 200, "Income has been successfully reviewed", $data); 
        }
        return response()->json($response);
    }

    public function delete($id)
    {
        $data = Income::find($id);
        StockOpname::where('transaction_id', $id)->where('status', 'Penjualan')->delete();
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->delete();
            $response = array(
                "success" => true,
                "status_code" => 200,
                "message" => "Income has been successfully deleted"
            );   
        }
        return response()->json($response);
    }
    
    public function isItNotValid($request, $type=null) 
    {
        $rules = array();
        $invoice_number = $request->invoice_number;
        if ($type == 'unique') {
            $existingInvoice = Income::where('invoice_number', $invoice_number)->get();
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
        if($request->payment_method == null) {
            $rules += array (
                    'payment_method' => 'required'
                );
        }
        if($request->date == null) {
            $rules += array (
                    'date' => 'required'
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
        $data = array("Tunai", "Transfer", "Pembayaran Uang Muka", "Pembayaran Bulanan", "Pembayaran Sisa Bulanan", "Retur Penjualan");
        $response = createResponse(true, 200, "Pick one payment method", $data);
        return response()->json($response);
    }

    private function accountPaymentMethods()
    {
        return array(
            "Tunai" => array(
                "debit_account" => 1,
                "credit_account" => 2
            ),
            "Transfer" => array(
                "debit_account" => 10,
                "credit_account" => 2
            ),
            "Pembayaran Uang Muka" => array(
                "debit_account" => 1,
                "credit_account" => 6
            ),
            "Pembayaran Bulanan" => array(
                "debit_account" => 4,
                "credit_account" => 2
            ),
            "Pembayaran Sisa Bulanan" => array(
                "debit_account" => 1,
                "credit_account" => 6
            ),
            "Pembayaran Sisa Bulanan" => array(
                "debit_account" => 1,
                "credit_account" => 5
            ),
        );
    }

}
