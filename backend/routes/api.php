<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeLikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/user/recipes', [RecipeController::class, 'userRecipes']);

Route::middleware('auth:sanctum')->get('/user/liked-recipes', [RecipeController::class, 'likedRecipes']);

Route::middleware('auth:sanctum')->post('/recipes/{id}/like', [RecipeLikeController::class, 'store']);

Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);


