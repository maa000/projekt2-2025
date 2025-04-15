<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeListResource;


class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with([
            'images',
            'quantities.ingredient',
            'quantities.measurement',
            'tags',
            'user',
            'course',
            'likes',
        ])->get();

        return RecipeListResource::collection($recipes);
    }


    public function show($id)
    {
        $recipe = Recipe::with(['steps', 'ingredients','quantities', 'quantities.ingredient', 'quantities.measurement', 'likes', 'images'])->findOrFail($id);
        return new RecipeResource($recipe);
    }
}




