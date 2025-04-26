<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\RecipeLike;
use Illuminate\Http\Request;

class RecipeLikeController extends Controller
{
    public function store($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $existingLike = RecipeLike::where('user_id', $user->id)
            ->where('recipe_id', $id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Like törölve', 'liked' => false]);
        } else {
            RecipeLike::create([
                'user_id' => $user->id,
                'recipe_id' => $id,
                'like_date' => now(),
            ]);

            return response()->json(['message' => 'Like hozzáadva', 'liked' => true]);
        }
    }
}
