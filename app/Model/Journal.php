<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Model\Account;
use App\Model\DailyJReview as DJReview;
use App\Model\Ledger;

class Journal extends Model
{
    public function reviewed_by()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function review()
    {
        return $this->belongsTo(DJReview::class, 'djreview_id');
    }

    public function ledger()
    {
        return $this->hasOne(Ledger::class, 'journal_id');
    }
    
}
