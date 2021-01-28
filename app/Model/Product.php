<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function category($value='')
    {
    	return $this->belongsTo('App\Model\ProductCategory', 'product_category_id');
    }

    public function material()
    {
        return $this->belongsToMany('App\Model\RawMaterial', 'product_material', 'product_id', 'raw_material_id')
                ->withPivot('ammount', 'created_at', 'updated_at');
    }
}
