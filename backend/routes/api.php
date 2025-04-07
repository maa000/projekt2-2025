<?php

use App\Http\Controllers\RecipeCardController;
use App\Http\Controllers\RecipeController;
use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/recipes', [RecipeCardController::class, 'index']);
//Route::post('/recipes', [RecipeController::class, 'store']);

Route::get('/recipes/{id}', [RecipeController::class, 'show']);

//Route::get('/recipes/{id}', function ($id) {
//    return new RecipeResource(Recipe::all()->find($id));
//});
