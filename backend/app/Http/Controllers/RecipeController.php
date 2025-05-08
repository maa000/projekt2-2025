<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\Measurement;
use App\Models\Quantity;
use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeListResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use App\Models\Ingredient;
use App\Models\Image;
use App\Models\RecipeStep;
use Illuminate\Support\Facades\Storage;


class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::withCount('likes')->with([
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
        $recipe = Recipe::with([
            'steps',
            'ingredients',
            'quantities',
            'quantities.ingredient',
            'quantities.measurement',
            'likes',
            'images',
            'tags',
            'user',
            'course',
            'comments.likes',
            'comments.user',
        ])->findOrFail($id);

        return new RecipeResource($recipe);
    }

    public function userRecipes()
    {
        $user = Auth::user();

        $recipes = Recipe::where('user_id', $user->id)->get();

        return ProfileResource::collection($recipes);
    }

    public function likedRecipes()
    {
        $user = Auth::user();

        return ProfileResource::collection($user->likedRecipes);
    }

    public function main()
    {
        $now = Carbon::now();

        // Legjobbak - összes like alapján
        $topRecipes = Recipe::withCount('likes')
            ->orderByDesc('likes_count')
            ->take(3)
            ->get();

        // Felkapott receptek - aktuális hónap like-jai alapján
        $popularRecipes = Recipe::whereHas('likes', function ($query) use ($now) {
            $query->whereYear('like_date', $now->year)
                ->whereMonth('like_date', $now->month);
        })
            ->withCount(['likes as monthly_likes' => function ($query) use ($now) {
                $query->whereYear('like_date', $now->year)
                    ->whereMonth('like_date', $now->month);
            }])
            ->orderByDesc('monthly_likes')
            ->take(3)
            ->get();

        // Random recept
        $randomRecipe = Recipe::inRandomOrder()->first();

        return response()->json([
            'popular' => RecipeResource::collection($popularRecipes),
            'top' => RecipeResource::collection($topRecipes),
            'random' => new RecipeResource($randomRecipe),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'recipe_description' => 'nullable|string',
            'cuisine' => 'nullable|string',
            'prep_time' => 'required',
            'cook_time' => 'required',
            'course_id' => 'required|exists:courses,course_id',
            'food_category_id' => 'required|exists:food_categories,food_category_id',
            'image' => 'nullable|image|max:2048',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.name' => 'required|string',
            'ingredients.*.amount' => 'required|string',
            'ingredients.*.unit' => 'required|string',
            'steps' => 'required|array|min:1',
            'steps.*' => 'required|string',
        ]);


        $recipe = Recipe::create([
            'user_id' => auth()->id(),
            'recipe_name' => $validated['recipe_name'],
            'recipe_description' => $validated['recipe_description'],
            'cuisine' => $validated['cuisine'],
            'prep_time' => $validated['prep_time'],
            'cook_time' => $validated['cook_time'],
            'course_id' => $validated['course_id'],
            'food_category_id' => $validated['food_category_id'],
            'upload_date' => now(),
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipe_images', 'public');

            Image::create([
                'recipe_id' => $recipe->recipe_id,
                'image_url' => env('APP_URL') . '/storage/' . $imagePath,
                'upload_date' => now(),
            ]);
        }

        foreach ($validated['ingredients'] as $ingredient) {
            $ingredientModel = Ingredient::where('ingredient_name', $ingredient['name'])->first();
            $measurementId = Measurement::where('measurement_name', $ingredient['unit'])->value('measurement_id');

            if ($ingredientModel && $measurementId) {
                Quantity::create([
                    'recipe_id' => $recipe->recipe_id,
                    'ingredient_id' => $ingredientModel->ingredient_id,
                    'ingredient_quantity' => $ingredient['amount'],
                    'measurement_id' => $measurementId,
                ]);
            }
        }

        foreach ($validated['steps'] as $index => $stepText) {
            $recipe->steps()->create([
                'step_number' => $index + 1,
                'step_description' => $stepText,
            ]);
        }

        return response()->json(['message' => 'Recept sikeresen elmentve.'], 201);
    }
}




