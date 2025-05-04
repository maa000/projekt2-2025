<?php

namespace App\Models;

use App\Models\RecipeStep;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Quantity;
use App\Models\RecipeLike;
use App\Models\Course;
use App\Models\User;
use App\Models\Tag;
use App\Models\Comment;

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

    public function comments()
    {
        return $this->hasMany(Comment::class, 'recipe_id');
    }
}
