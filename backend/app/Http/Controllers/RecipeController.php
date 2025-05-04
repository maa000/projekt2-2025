<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Measurement;
use App\Models\Quantity;
use App\Models\RecipeStep;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeListResource;

class RecipeController extends Controller
{
    // Listázás
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

    // Részletek
    public function show($id)
    {
        $recipe = Recipe::with([
            'steps',
            'ingredients',
            'quantities',
            'quantities.ingredient',
            'quantities.measurement',
            'likes',
            'images'
        ])->findOrFail($id);

        return new RecipeResource($recipe);
    }

    // Beküldés
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'cuisine' => 'required|string|max:255',
            'prep_time' => 'required|date_format:H:i:s',
            'cook_time' => 'required|date_format:H:i:s',
            'description' => 'required|string',
            'food_category_id' => 'required|exists:food_categories,food_category_id',
            'course_id' => 'required|exists:courses,course_id',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.name' => 'required|string|exists:ingredients,ingredient_name',
            'ingredients.*.amount' => 'required|numeric|min:0',
            'ingredients.*.unit' => 'required|string|exists:measurements,measurement_name',
            'steps' => 'required|array|min:1',
            'steps.*' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $recipe = Recipe::create([
            'recipe_name' => $validated['recipe_name'],
            'cuisine' => $validated['cuisine'],
            'prep_time' => $validated['prep_time'],
            'cook_time' => $validated['cook_time'],
            'recipe_description' => $validated['description'],
            'food_category_id' => $validated['food_category_id'],
            'course_id' => $validated['course_id'],
            'upload_date' => now(),
        ]);

        foreach ($validated['ingredients'] as $item) {
            $ingredient = Ingredient::where('ingredient_name', $item['name'])->first();
            $measurement = Measurement::where('measurement_name', $item['unit'])->first();

            if ($ingredient && $measurement) {
                Quantity::create([
                    'recipe_id' => $recipe->recipe_id,
                    'ingredient_id' => $ingredient->ingredient_id,
                    'measurement_id' => $measurement->measurement_id,
                    'ingredient_quantity' => $item['amount'],
                ]);
            }
        }

        foreach ($validated['steps'] as $index => $stepText) {
            RecipeStep::create([
                'recipe_id' => $recipe->recipe_id,
                'step_number' => $index + 1,
                'step_description' => $stepText,
            ]);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/images');
            $filename = basename($path);

            Image::create([
                'recipe_id' => $recipe->recipe_id,
                'image_path' => 'images/' . $filename,
            ]);
        }

        return response()->json(['message' => 'Recept sikeresen elmentve.'], 201);
    }
}
