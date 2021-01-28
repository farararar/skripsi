<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\RawMaterialCategory;
use Validator;

class RawMaterialCategoryController extends Controller
{
    public function Index()
    {
        $data = RawMaterialCategory::orderby('created_at', 'desc')->get();

        if(count($data) == 0) {
            $response = createResponse(false, 404, "Data is Not Available");
        } else {
            $response = createResponse(true, 200, "Raw Material Category has been successfully retrieved", $data);
        }

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

        $data = new RawMaterialCategory;
        $data->name = $request->name;
        $data->save();
        $response = createResponse(true, 200, "Raw Material Category has been successfully stored");
        return response()->json($response);
    }

    public function Delete($id)
    {
        $data = RawMaterialCategory::find($id);
        if($data == null) {
            $response = createResponse(false, 404, "Data is Not Available");   
        } else {
            $data->delete();
            $response = createResponse(true, 200, "Raw Material Category Type has been successfully deleted");
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
}
