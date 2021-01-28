<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Product;
use App\Model\StockBahan;
use Validator;
use App\Model\StockOpname;

class StockOpnameController extends Controller
{
    public function Index(Request $request)
    {
        $data = StockOpname::with('product')->where(function($q) use ($request) {
            if($request->since !== null) {
                $q->where('date', '>=', $request->since);
            }
            if($request->until !== null) {
                $q->where('date', '<=', $request->until);
            }
        })->orderby('created_at', 'desc')->get();

        foreach($data as $list) {
        	$list->product_name = $list->product->name;
        }


        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data Not Found");
        } else {
            $response = createResponse(true, 200, "Stock Opname has been successfully retrieved", $data);
        }
        return response()->json($response);
    }


    public function Store(Request $request)
    {
        $currentStock = $this->currentStock($request->product_id);

        $isItNotValid = $this->isItNotValid($request);
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        if($request->status == 'Penjualan' || $request->status == 'Sisa Dibuang') {
            $modified_stock = $currentStock - $request->stock;
            if($modified_stock < 0) {
                $response = createResponse(false, 400, "Stock tidak cukup, sisa stok produk ini : ".$currentStock); 
                return response()->json($response);
            }
        }

        $data 							= new StockOpname;
        $data->product_id 				= $request->product_id;
        $data->date 					= $request->date;
        $data->status 					= $request->status;
        $data->stock 					= $request->stock;

        if($request->status == 'Produksi')
        {
            $product = Product::with('material')->find($request->product_id);
            foreach ($product->material as $material) {

                $modifierStockBahan = $material->unit_conversion * ($material->pivot->ammount * $request->stock);
                // if ($modifierStockBahan == 0) {
                //     return "".$material->unit_conversion." * (".$material->pivot->ammount." * ".$request->stock.")";
                // }
                $currentStockBahan = $this->currentStockBahan($material->id);
                $result = $currentStockBahan - $modifierStockBahan;
                if($result < 0) {
                    $response = createResponse(false, 400, "Stock ".$material->name." tidak cukup, sisa stok produk ini : ".$currentStockBahan." ".$material->unit_buy.". Stok yang dibutuhkan untuk produksi : ".$modifierStockBahan." ".$material->unit_buy); 
                    return response()->json($response);
                }
                $stock = new StockBahan;
                $stock->raw_material_id = $material->id;
                $stock->date = $request->date;
                $stock->stock = $modifierStockBahan;
                $stock->status = 'Produksi';
                $stock->save();
            }
        }

        $data->save();

        $response = createResponse(true, 200, "StockOpname has been successfully stored");
        return response()->json($response);
    }

     public function isItNotValid($request, $type=null) 
    {
        $rules = array();
        if($request->product_id == null) {
            $rules += array (
                    'product_id' => 'required',
                );
        }
        if(count($rules) > 0) {
            $validator = Validator::make([], $rules);
            return $validator->availableErrors();
        }
        return null;
    }

    public function getStockStatus($type)
    {
        if($type == 'produk') {
            $data = array( 
                "Produksi",
                "Penjualan",
                "Sisa Dibuang"
            );
        } else {
            $data = array( 
                "Tambah Stock",
                "Sisa Dibuang"
            );
        }
        $response = createResponse(true, 200, "Pick one", $data);
        return response()->json($response);
    }

    private function currentStockBahan($material_id)
    {
        $opname = StockBahan::select('status', 'stock')->where('raw_material_id', $material_id)->get();
        $total_stok = 0;
        foreach ($opname as $stok) {
            if($stok->status == 'Produksi' || $stok->status == 'Sisa Dibuang'){
                $total_stok -= $stok->stock;
            } else {
                $total_stok += $stok->stock;
            }
        }
        return $total_stok;
    }

    private function currentStock($product_id)
    {
        $opname = StockOpname::select('status', 'stock')->where('product_id', $product_id)->get();
        $total_stok = 0;
        foreach ($opname as $stok) {
            if($stok->status == 'Penjualan' || $stok->status == 'Sisa Dibuang'){
                $total_stok -= $stok->stock;
            } else {
                $total_stok += $stok->stock;
            }
        }
        return $total_stok;
    }
}
