<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeListResource;
use Illuminate\Support\Facades\Auth;


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
        ])->findOrFail($id);

        return new RecipeResource($recipe);
    }

    public function userRecipes()
    {
        $user = Auth::user();

        $recipes = Recipe::where('user_id', $user->id)->get();

        return ProfileResource::collection($recipes);
    }


}




