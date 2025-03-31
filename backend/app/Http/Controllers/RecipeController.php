<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::select(
            'recipes.recipe_id',
            'recipes.recipe_name',
            'recipes.recipe_description',
            DB::raw('(SELECT image_url FROM images WHERE images.recipe_id = recipes.recipe_id LIMIT 1) as image_url'),
            DB::raw('(SELECT COUNT(*) FROM recipe_likes WHERE recipe_likes.recipe_id = recipes.recipe_id) as like_count')
        )
            ->get();

        return RecipeResource::collection($recipes);
    }
}

