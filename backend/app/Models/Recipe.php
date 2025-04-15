<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    protected $primaryKey = 'recipe_id';

    protected $fillable = [
        'user_id',
        'course_id',
        'food_category_id',
        'recipe_name',
        'recipe_description',
        'cuisine',
        'prep_time',
        'cook_time',
        'upload_date'
    ];

    public function steps()
    {
        return $this->hasMany(RecipeStep::class, 'recipe_id')->orderBy('step_number');
    }

    public function images()
    {
        return $this->hasOne(Image::class, 'recipe_id');
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'quantity', 'recipe_id', 'ingredient_id')
            ->withPivot('ingredient_quantity', 'measurement_id');
    }

    public function quantities()
    {
        return $this->hasMany(Quantity::class, 'recipe_id');
    }

    public function likes()
    {
        return $this->hasMany(RecipeLike::class, 'recipe_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'recipe_tags', 'recipe_id', 'tag_id');
    }
}
