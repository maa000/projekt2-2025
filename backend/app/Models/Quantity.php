<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quantity extends Model
{
    protected $table = 'quantity';
    protected $primaryKey = 'quantity_id';
    public $timestamps = false;

    protected $fillable = [
        'recipe_id',
        'ingredient_id',
        'measurement_id',
        'ingredient_quantity',
    ];

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class, 'measurement_id');
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }
}
