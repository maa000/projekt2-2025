<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {
        // eager load: képek és like-ok számát betölti előre
        $recipes = Recipe::with('images')->withCount('likes')->get();

        return RecipeResource::collection($recipes);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'recipe_description' => 'required|string',
            'cuisine' => 'required|string',
            'prep_time' => 'required|date_format:H:i:s',
            'cook_time' => 'required|date_format:H:i:s',
            'upload_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'course_id' => 'nullable|exists:course,id',
            'food_category_id' => 'nullable|exists:food_category,id',
        ]);

        $recipe = Recipe::create($validated);

        return response()->json([
            'message' => 'Recept sikeresen létrehozva!',
            'recipe' => $recipe,
        ], 201);
    }
}


