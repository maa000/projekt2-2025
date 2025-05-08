<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeStep extends Model
{
    public $timestamps = false;

    protected $table = 'recipe_steps';

    protected $fillable = [
        'recipe_id',
        'step_number',
        'step_description',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
