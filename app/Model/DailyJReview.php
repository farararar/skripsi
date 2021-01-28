<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Model\Journal;
use App\User;

class DailyJReview extends Model
{
    protected $table = "daily_journal_reviews";

    public function journals()
    {
        return $this->hasMany(Journal::class, 'djreview_id');
    }
    
    public function reviewed_by()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

}
