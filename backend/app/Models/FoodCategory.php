<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodCategory extends Model
{
    protected $table = 'food_categories';
    protected $primaryKey = 'food_category_id';
    public $timestamps = false;

    protected $fillable = ['food_category_name'];
}
