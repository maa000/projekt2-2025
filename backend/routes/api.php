<?php

use App\Http\Controllers\RecipeCardController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\TokenAuthController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\FoodCategoryController;
use App\Http\Controllers\CourseController;




Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/recipes', [RecipeController::class, 'index']);

Route::get('/recipes/{id}', [RecipeController::class, 'show']);

Route::post('/register', [TokenAuthController::class, 'register']);
Route::post('/login', [TokenAuthController::class, 'login']);
Route::post('/recipes', [RecipeController::class, 'store']);


Route::get('/ingredients', [IngredientController::class, 'index']);
Route::get('/measurements', [MeasurementController::class, 'index']);
Route::get('/food-categories', [FoodCategoryController::class, 'index']);
Route::get('/courses', [CourseController::class, 'index']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [TokenAuthController::class, 'user']);
    Route::post('/logout', [TokenAuthController::class, 'logout']);
});
