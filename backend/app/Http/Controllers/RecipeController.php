<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;

class RecipeController extends Controller
{
    public function index()
    {
        // eager load: képek és like-ok számát betölti előre
        $recipes = Recipe::with('images')->withCount('likes')->get();

        return RecipeResource::collection($recipes);
    }
}


