<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Model\Account;
use App\Model\StockOpname;

class Income extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function reviewed_by()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function debit_account()
    {
        return $this->belongsTo(Account::class, 'debit_account');
    }
    public function credit_account()
    {
        return $this->belongsTo(Account::class, 'credit_account');
    }
    public function products()
    {
        return $this->hasMany(StockOpname::class, 'transaction_id')->where('status', 'Penjualan');
    }
}
