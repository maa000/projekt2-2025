<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\JsonResponse;

class IngredientController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Ingredient::select('name')->orderBy('name')->get());
    }
}
