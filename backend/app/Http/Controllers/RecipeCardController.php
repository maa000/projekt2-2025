<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecipeCardResource;
use App\Models\Recipe;
use Illuminate\Http\Request;
Use App\Models\Image;

class RecipeCardController extends Controller
{
    public function index()
    {
        // eager load: képek és like-ok számát betölti előre
        $recipes = Recipe::with('images')->withCount('likes')->get();

        return RecipeCardResource::collection($recipes);
    }
}
