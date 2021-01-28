<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StockBahan extends Model
{
    protected $table = "stock_material";

    public function material()
    {
        return $this->belongsTo('App\Model\RawMaterial', 'raw_material_id');
    }
}
