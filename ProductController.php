<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Product;
use App\Model\ProductCategory;
use App\Model\StockOpname;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function Index(Request $request)
    {
        $keyword = $request->keyword;
        $data = Product::with('category')->where('name', 'LIKE', '%'.$keyword.'%')->where('deleted', 0)->get();

        foreach($data as $list) {
        	$image_path = url($list->image);
        	$list->kategori = $list->category->name;
            $list->image = $image_path;
        }

        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");
        } else {
            $response = createResponse(true, 200, "Products has been successfully retrieved", $data);
        }

        return response()->json($response);
    }

    public function listCategory()
    {
        $data = ProductCategory::select('id', 'name')->orderby('name', 'asc')->get();
        $response = createResponse(true, 200, "Products Category has been successfully retrieved", $data);
        return response()->json($response);
    }

    public function listUnit()
    {
        $data = array("Kilogram", "Gram", "Galon", "Liter", "Mililiter", "Pack", "Buah", "Karton", "Butir", "Sachet");
        $response = createResponse(true, 200, "Unit has been successfully retrieved", $data);
        return response()->json($response);
    }

    public function get($id)
    {
        $data = Product::with('material')->where('deleted', 0)->find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $response = createResponse(true, 200, "Product Retrieved", $data);
        }
        return response()->json($response);
    }

    public function Store(Request $request)
    {
        $isItNotValid = $this->isItNotValid($request, 'image');
        if($isItNotValid !== null) {
            $data = (object) $isItNotValid;
            $response = createResponse(false, 400, "Validation failed, check your input", $data); 
            return response()->json($response);
        }

	    $image_name	= time().'_'.rand(100,999).'.png';
	    $request->file('image')->move('uploads/images', $image_name);

        $data 							= new Product;
        $data->product_category_id 		= $request->product_category_id;
        $data->name 					= $request->name;
        $data->code 					= $request->code;
        $data->unit_product 			= $request->unit_product;
        $data->unit_price 			    = $request->unit_price;
        $data->image 					= 'uploads/images/'.$image_name;
		$data->information 				= $request->information;
        $data->save();

        foreach($request->raw_material as $material_id => $ammount) {
            $data->material()->attach($material_id, ["ammount" => $ammount]);
        }

        $response = createResponse(true, 200, "Product has been successfully stored");
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
        $data 							= Product::find($id);
        $data->product_category_id 		= $request->product_category_id;
        $data->name 					= $request->name;
        $data->code 					= $request->code;
        $data->unit_product 			= $request->unit_product;
        $data->unit_price 			    = $request->unit_price;
        if($request->hasFile('image')) {
            $image_name	= time().'_'.rand(100,999).'.png';
            $request->file('image')->move('uploads/images', $image_name);  
            $data->image 					= 'uploads/images/'.$image_name;  
        }
		$data->information 				= $request->information;
        $data->save();

        $data->material()->detach();
        foreach($request->raw_material as $material_id => $ammount) {
            $data->material()->attach($material_id, ["ammount" => $ammount]);
        }
        $response = createResponse(true, 200, "Product has been successfully updated");
        return response()->json($response);
    }

    public function Delete($id)
    {
        $data = Product::where('deleted', 0)->find($id);

        
    	// dd(url($data->image));
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->deleted = 1;
            $data->save();
            $response = createResponse(true, 200, "Product Type has been successfully deleted");
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
        if($type == 'image')
        {
            if(!$request->hasFile('image')) {
                $rules += array (
                    'image' => 'required'
                );
            } else {
                $extension = $request->file('image')->getClientOriginalExtension();
                $acceptable_extensions = array("png", "jpg", "jpeg", "bmp", "webp");

                if(!in_array($extension, $acceptable_extensions)) {
                    $rules += array (
                        'image' => 'image'
                    );
                }
            }
        }
        
        if(count($rules) > 0) {
            $validator = Validator::make([], $rules);
            return $validator->availableErrors();
        }
        return null;
    }
}
