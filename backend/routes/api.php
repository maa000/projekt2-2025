<?php


use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/recipes', function () {
    return RecipeResource::collection(Recipe::all());
});
