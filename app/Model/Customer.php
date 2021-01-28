<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Model\Income;
use App\User;
use App\Model\Account;

class Customer extends Model
{
    public function incomes()
    {
        return $this->hasMany(Income::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'incomes', 'customer_id', 'user_id');
    }

    public function accounts()
    {
        return $this->belongsToMany(Account::class, 'incomes', 'customer_id', 'account_id');
    }

}
