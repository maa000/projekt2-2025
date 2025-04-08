<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;

class RecipeController extends Controller
{
    public function show($id)
    {
        $recipe = Recipe::with(['steps', 'ingredients','quantities', 'quantities.ingredient', 'quantities.measurement', 'likes', 'images'])->findOrFail($id);
        return new RecipeResource($recipe);
    }
}




