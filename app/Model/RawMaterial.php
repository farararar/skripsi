<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    protected $table = 'raw_material';

    public function produk()
    {
        return $this->belongsToMany('App\Model\Product', 'product_material', 'raw_material_id', 'product_id')
                ->withPivot('ammount', 'created_at', 'updated_at');
    }

    public function stock()
    {
        return $this->hasMany('App\Model\StockBahan', 'raw_material_id');
    }
}
