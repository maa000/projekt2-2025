<?php

namespace App\Http\Controllers;

use App\Models\FoodCategory;
use Illuminate\Http\JsonResponse;

class FoodCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            FoodCategory::select('food_category_id as id', 'food_category_name as name')
                ->orderBy('food_category_name')
                ->get()
        );
    }
}
