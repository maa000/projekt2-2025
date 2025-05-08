<?php

namespace App\Http\Controllers;

use App\Http\Resources\DropdownResource;
use App\Models\Course;
use App\Models\FoodCategory;
use App\Models\Ingredient;
use App\Models\Measurement;

class RecipeFormController extends Controller
{
    public function getFormOptions()
    {
        return response()->json([
            'categories' => DropdownResource::collection(FoodCategory::all()),
            'courses' => DropdownResource::collection(Course::all()),
            'ingredients' => DropdownResource::collection(Ingredient::all()),
            'measurements' => DropdownResource::collection(Measurement::all()),
        ]);
    }
}
