<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\RawMaterial;
use App\Model\StockBahan;
use Validator;

class RawMaterialController extends Controller
{
    public function Index(Request $request)
    {
        $filter = $request->has('filter');
        if($request->filter){
            $data = RawMaterial::where('type', $request->filter)->orderby('created_at', 'desc')->get();
        }else{
            $data = RawMaterial::orderby('created_at', 'desc')->get();
        }
        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");
        } else {
            $response = createResponse(true, 200, "Raw Material has been successfully retrieved", $data);
        }
        return response()->json($response);
    }

    public function stockMaterialList(Request $request)
    {
        $data = StockBahan::with('material')->where(function($q) use ($request) {
            if($request->since !== null) {
                $q->where('date', '>=', $request->since);
            }
            if($request->until !== null) {
                $q->where('date', '<=', $request->until);
            }
        })->orderby('created_at', 'desc')->get();

        if(count($data) == 0) {
            foreach($data as $list) {
                $list->material_name = $list->material->name;
            }
            $response = createResponse(false, 404, "Data Not Found");
        } else {
            $response = createResponse(true, 200, "Stock bahan has been successfully retrieved", $data);
        }
        return response()->json($response);
    }

    public function stockMaterialStore(Request $request)
    {
        $currentStock = $this->currentStock($request->material_id);
        $material = RawMaterial::find($request->material_id);

        if($request->status == 'Sisa Dibuang') {
            $modifierStockBahan = $material->unit_conversion * ($material->pivot->ammount * $request->stock);
            $currentStockBahan = $this->currentStockBahan($material->id);
            $modified_stock = $currentStockBahan - $modifierStockBahan;

            if($modified_stock < 0) {
                $response = createResponse(false, 400, "Stock ".$material->name." tidak cukup, sisa stok produk ini : ".$currentStockBahan." ".$material->unit_buy.". Stok yang dibutuhkan untuk produksi : ".$modifierStockBahan." ".$material->unit_buy); 
                return response()->json($response);
            }
        }

        $data 							= new StockBahan;
        $data->raw_material_id 			= $request->material_id;
        $data->date 					= $request->date;
        $data->status 					= $request->status;
        $data->stock 					= $request->stock;
        $data->save();

        $response = createResponse(true, 200, "StockOpname has been successfully stored");
        return response()->json($response);
    }


    public function Store(Request $request)
    {
    	$isItNotValid = $this->isItNotValid($request);
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

        $data 								= new RawMaterial;
        $data->raw_material_category_id 	= $request->raw_material_category_id;
        $data->name 						= $request->name;
        $data->code 						= $request->code;
        $data->type 						= $request->type;
        $data->unit_buy 					= $request->unit_buy;
        $data->unit_use 					= $request->unit_use;
        $data->unit_price 					= $request->unit_price;
        $data->unit_conversion 					= $request->unit_conversion;
        $data->save();
        $response = createResponse(true, 200, "Raw Material has been successfully stored");
        return response()->json($response);
    }


    public function report(Request $request)
    {
        $since = $request->since;
        $until = $request->until;
        $data = RawMaterial::orderBy('name', 'asc')->get();
        foreach ($data as $material) {
            $material->stok_awal = $this->previousStock($material->id, $since);
            $material->penggunaan = $this->hitungStock($material->id, $since, $until, 'Produksi');
            $material->restock = $this->hitungStock($material->id, $since, $until, 'Restock');
            $material->sisa_dibuang = $this->hitungStock($material->id, $since, $until, 'Sisa Dibuang');
            $material->persediaan = ($material->stok_awal + $material->restock) - ($material->penggunaan + $material->sisa_dibuang);
        }

        if($data == null){
            $response = createResponse(false, 404, "Data is Not Available");   
        }else{
            $response = createResponse(true, 200, "Report has been successfully generated", $data);
        }
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

        $data 								= RawMaterial::find($id);
        $data->raw_material_category_id 	= $request->raw_material_category_id;
        $data->name 						= $request->name;
        $data->code 						= $request->code;
        $data->type 						= $request->type;
        $data->unit_buy 					= $request->unit_buy;
        $data->unit_use 					= $request->unit_use;
        $data->unit_price 					= $request->unit_price;
        $data->unit_conversion 				= $request->unit_conversion;
        $data->save();
        $response = createResponse(true, 200, "Raw Material has been successfully updated");
        return response()->json($response);
    }


    public function Delete($id)
    {
        $data = RawMaterial::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->delete();
            $response = createResponse(true, 200, "Raw Material Type has been successfully deleted");
        }
        return response()->json($response);
    }

    public function isItNotValid($request, $type=null) 
    {
        $rules = array();
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

    private function previousStock($material_id, $since)
    {
        $opname = StockBahan::select('status', 'stock')
                    ->where('date', '<', $since)
                    ->where('raw_material_id', $material_id)->get();
        $previous_stock = 0;
        foreach ($opname as $stok) {
            if($stok->status == 'Produksi' || $stok->status == 'Sisa Dibuang'){
                $previous_stock -= $stok->stock;
            } else {
                $previous_stock += $stok->stock;
            }
        }
        return $previous_stock;
    }


    private function hitungStock($material_id, $since, $until, $status)
    {
        $opname = StockBahan::select('status', 'stock')
                    ->where('date', '>=', $since)
                    ->where('date', '<=', $until)
                    ->where('status', $status)
                    ->where('raw_material_id', $material_id)->get();
        $total = 0;
        foreach ($opname as $stok) {
            $total += $stok->stock;
        }
        return $total;
    }

    private function currentStock($material_id)
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
}
