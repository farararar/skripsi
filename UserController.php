<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //
    public function login(Request $request) 
    {
        $email = $request->email;
        $token = app('auth')->attempt($request->only('email', 'password'));
        if($token) {
            $data = User::where('email', $email)->first();
            $data->token = $token;
            $response = array(
                "success" => true,
                "status_code" => 200,
                "message" => "Welcome",
                "data" => $data
            );   
        } else {
            $response = array(
                "success" => false,
                "status_code" => 401,
                "message" => "E-Mail or Password is Incorrect"
            );   
        }
        return response()->json($response);
    }
}
