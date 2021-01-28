<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StockOpname extends Model
{
    protected $table = 'stock_opname';

    public function product()
    {
    	return $this->belongsTo(Product::Class)->where('deleted', 0);
    }
}
