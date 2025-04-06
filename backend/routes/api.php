<?php

use App\Http\Controllers\RecipeCardController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/recipes', [RecipeCardController::class, 'index']);
//Route::post('/recipes', [RecipeController::class, 'store']);

Route::get('/recipes/{id}', [RecipeController::class, 'show']);
