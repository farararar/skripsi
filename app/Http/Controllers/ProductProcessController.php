<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Model\ProductProcess;
use App\Model\RawMaterial;
use App\Model\StockOpname;

class ProductProcessController extends Controller
{
    public function Index($product_id)
    {
        $process = ProductProcess::where('product_id', $product_id)->orderby('created_at', 'desc');
        $data = $process->get();
        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");
        } else {

            foreach ($data as $value) {
                $value->product_name = $value->product->name;
            }
    
            $count_null = $process->where('complete_date', null)->count();
            if($count_null > 0) {
                $is_started = 1;
            } else {
                $is_started = 0;
            }
            $response = createResponse(true, 200, "Products Process has been successfully retrieved", $data, ["is_started" => $is_started]);
        }

        return response()->json($response);
    }

    public function Start(Request $request)
    {
        $check = ProductProcess::where('product_id', $request->product_id)->where('complete_date', null)->get();
        if(count($check) > 0) {
            $response = createResponse(false, 400, "The previous production mode is still ongoing"); 
            return response()->json($response);
        }
        $isItNotValid = $this->isItNotValid($request);
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        $data 							= new ProductProcess;
        $data->product_id 				= $request->product_id;
        $data->production_code 			= $request->production_code;
        $data->start_date 			    = date('Y-m-d');
        $data->information 				= $request->information;
        $data->save();
        
        $response = createResponse(true, 200, "Production mode has been successfully started");
        return response()->json($response);
    }

    public function Stop($id)
    {
        $data       = ProductProcess::where('product_id', $id)->where('complete_date', null)->orderBy('created_at', 'desc')->first();

        if($data->complete_date !== null ) {
            $response = createResponse(false, 400, "This production mode has already been completed"); 
            return response()->json($response);
        }

        $data->complete_date 			= date('Y-m-d');
        $data->save();
        
        $response = createResponse(true, 200, "Production mode has been successfully completed");
        return response()->json($response);
    }

    public function Delete($id)
    {
        $data = ProductProcess::find($id);
        if($data == null){
            $response = createResponse(false, 404, "Data is Not Available");   
        }else{
            $data->delete();
            $response = createResponse(true, 200, "Product Process Type has been successfully deleted");
        }
        return response()->json($response);
    }

    public function report($id)
    {
        $data = ProductProcess::find($id);
        if($data->complete_date == null) {
            $response = createResponse(false, 500, "Production mode is still ongoing");
            return response()->json($response);   
        }
        $product_id = $data->product_id;
        $start_date = $data->start_date;
        $complete_date = $data->complete_date;
        $previous_stock = $this->previousStock($product_id, $start_date);
        $data->stok_awal = $previous_stock;
        $data->penjualan = $this->hitungStock($product_id, $start_date, $complete_date, 'Penjualan');
        $data->produksi = $this->hitungStock($product_id, $start_date, $complete_date, 'Restock');
        $data->sisa_dibuang = $this->hitungStock($product_id, $start_date, $complete_date, 'Sisa Dibuang');
        $data->stock_akhir = ($data->stok_awal + $data->produksi) - ($data->penjualan + $data->sisa_dibuang);

        if($data == null){
            $response = createResponse(false, 404, "Data is Not Available");   
        }else{
            $response = createResponse(true, 200, "Report has been successfully generated", $data);
        }
        return response()->json($response);
    }

    public function isItNotValid($request, $type=null) 
    {
        $rules = array();
        if($request->production_code == null || $request->product_id == null) {
            $rules += array (
                    'production_code' => 'required',
                    'product_id' => 'require'
                );
        }
        
        if(count($rules) > 0) {
            $validator = Validator::make([], $rules);
            return $validator->availableErrors();
        }
        return null;
    }

    private function previousStock($product_id, $date)
    {
        $opname = StockOpname::select('status', 'stock')
                    ->where('date', '<', $date)
                    ->where('product_id', $product_id)->get();
        $previous_stock = 0;
        foreach ($opname as $stok) {
            if($stok->status == 'Penjualan' || $stok->status == 'Sisa Dibuang'){
                $previous_stock -= $stok->stock;
            } else {
                $previous_stock += $stok->stock;
            }
        }
        return $previous_stock;
    }

    private function hitungStock($product_id, $start_date, $complete_date, $status)
    {
        $opname = StockOpname::select('status', 'stock')
                    ->where('date', '>=', $start_date)
                    ->where('date', '<=', $complete_date)
                    ->where('status', $status)
                    ->where('product_id', $product_id)->get();
        $total = 0;
        foreach ($opname as $stok) {
            $total += $stok->stock;
        }
        return $total;
    }
}
