<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Model\Income;
use App\Model\Outcome;
use App\Model\Journal;
use App\Model\Ledger;

class Account extends Model
{
    public function debit_incomes()
    {
        return $this->hasMany(Income::class, 'debit_account');
    }
    public function credit_incomes()
    {
        return $this->hasMany(Income::class, 'credit_account');
    }
    public function debit_outcomes()
    {
        return $this->hasMany(Outcome::class, 'debit_account');
    }
    public function credit_outcomes()
    {
        return $this->hasMany(Income::class, 'credit_account');
    }

    public function journals()
    {
        return $this->hasMany(Journal::class);
    }

    public function ledgers()
    {
        return $this->hasMany(Ledger::class);
    }

    public function income_users()
    {
        return $this->belongsToMany(User::class, 'incomes', 'account_id', 'user_id');
    }

    public function outcome_users()
    {
        return $this->belongsToMany(User::class, 'outcomes', 'account_id', 'user_id');
    }
    
}
