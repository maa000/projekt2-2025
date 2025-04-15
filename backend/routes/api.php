<?php

use App\Http\Controllers\RecipeCardController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\TokenAuthController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/recipes', [RecipeController::class, 'index']);

Route::get('/recipes/{id}', [RecipeController::class, 'show']);

Route::post('/register', [TokenAuthController::class, 'register']);
Route::post('/login', [TokenAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [TokenAuthController::class, 'user']);
    Route::post('/logout', [TokenAuthController::class, 'logout']);
});


