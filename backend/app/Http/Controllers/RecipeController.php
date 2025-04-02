<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipeController extends Controller
{
    public function index()
    {
        return response()->json([
            ['id' => 1, 'title' => 'Kaja 1', 'image_url' => '/images/1.jpg', 'rating' => 5, 'views' => 100],
            ['id' => 2, 'title' => 'Kaja 2', 'image_url' => '/images/2.jpg', 'rating' => 4, 'views' => 80],
            ['id' => 3, 'title' => 'Kaja 3', 'image_url' => '/images/3.jpg', 'rating' => 5, 'views' => 120],
        ]);
    }
}



