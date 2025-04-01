<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $primaryKey = 'recipe_id';
    protected $fillable = [
        'recipe_name',
        'recipe_description',
        'cuisine',
        'prep_time',
        'cook_time',
        'upload_date',
        'user_id',
        'course_id',
        'food_category_id'
    ];

    // Egy recepthez több kép tartozhat (most csak az első kell)
    public function images()
    {
        return $this->hasMany(Image::class, 'recipe_id');
    }

    // Egy recepthez több like is tartozhat
    public function likes()
    {
        return $this->hasMany(RecipeLike::class, 'recipe_id');
    }
}

