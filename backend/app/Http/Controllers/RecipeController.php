<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\RecipeStep;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes= Recipe::with('images')->withCount('likes')->get();

        return RecipeResource::collection($recipes);
    }


    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);

        $image = Image::where('recipe_id', $id)->first();
        $recipe->image_url = $image ? $image->image_url : null;

        $steps = RecipeStep::where('recipe_id', $id)
            ->orderBy('step_number')
            ->get();

        $recipe->steps = $steps;

        return response()->json(['data' => $recipe]);
    }


}
//    public function store(Request $request)
//    {
//        $validated = $request->validate([
//            'recipe_name' => 'required|string|max:255',
//            'recipe_description' => 'required|string',
//            'cuisine' => 'required|string',
//            'prep_time' => 'required|date_format:H:i:s',
//            'cook_time' => 'required|date_format:H:i:s',
//            'upload_date' => 'nullable|date',
//            'user_id' => 'required|exists:users,id',
//            'course_id' => 'nullable|exists:course,id',
//            'food_category_id' => 'nullable|exists:food_category,id',
//        ]);
//
//        $recipe = Recipe::create($validated);
//
//        return response()->json([
//            'message' => 'Recept sikeresen létrehozva!',
//            'recipe' => $recipe,
//        ], 201);
//    }



