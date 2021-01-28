<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = new User;
        $data->name = "Marketing"; 
        $data->username = "marketing"; 
        $data->email = "marketing@gmail.com"; 
        $data->password = Hash::make("123456"); 
        $data->level = "Marketing";
        $data->save();

        $data = new User;
        $data->name = "Operator"; 
        $data->username = "operator"; 
        $data->email = "operator@gmail.com"; 
        $data->password = Hash::make("123456"); 
        $data->level = "Operator";
        $data->save();

        $data = new User;
        $data->name = "Accountant"; 
        $data->username = "accountant"; 
        $data->email = "accountant@gmail.com"; 
        $data->password = Hash::make("123456"); 
        $data->level = "Accountant";
        $data->save();
    }
}
