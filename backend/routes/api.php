<?php

use App\Http\Controllers\RecipeCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/recipes', [RecipeCardController::class, 'index']);
//Route::post('/recipes', [RecipeController::class, 'store']);
