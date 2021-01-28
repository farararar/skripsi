<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProductProcess extends Model
{
    protected $table = 'product_process';

    public function product()
    {
    	return $this->belongsTo(Product::Class)->where('deleted', 0);
    }
}
