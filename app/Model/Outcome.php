<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Model\Account;

class Outcome extends Model
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
}
