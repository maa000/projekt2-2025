<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeLikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentLikeController;
use App\Http\Controllers\EmailChangeController;
use App\Http\Controllers\PasswordChangeController;
use App\Http\Controllers\UserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/user/recipes', [RecipeController::class, 'userRecipes']);

Route::middleware('auth:sanctum')->get('/user/liked-recipes', [RecipeController::class, 'likedRecipes']);

Route::middleware('auth:sanctum')->post('/recipes/{id}/like', [RecipeLikeController::class, 'store']);

Route::middleware('auth:sanctum')->post('/comments/{id}', [CommentController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user/email', [EmailChangeController::class, 'update']);
    Route::put( '/user/password', [PasswordChangeController::class, 'update']);
});

Route::get('/recipes', [RecipeController::class, 'index']);

Route::get('/recipes/home', [RecipeController::class, 'main']);

Route::get('/recipes/{id}', [RecipeController::class, 'show']);

Route::get('/recipes/{id}/comments', [CommentController::class, 'index']);

Route::post('/recipes/{id}/comments', [CommentController::class, 'store'])->middleware('auth:sanctum');

Route::post('/comments/{id}/like', [CommentLikeController::class, 'toggle'])->middleware('auth:sanctum');

Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

Route::middleware('auth:sanctum')->delete('/user/delete', [UserController::class, 'destroy']);


