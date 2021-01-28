<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Model\Account;

class Ledger extends Model
{
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
