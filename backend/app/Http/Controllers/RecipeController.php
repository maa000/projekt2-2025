<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\Recipe;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\CommentResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::withCount('likes')->with([
            'images',
            'quantities.ingredient',
            'quantities.measurement',
            'tags',
            'user',
            'course',
            'likes',
        ])->get();

        return RecipeListResource::collection($recipes);

    }


    public function show($id)
    {
        $recipe = Recipe::with([
            'steps',
            'ingredients',
            'quantities',
            'quantities.ingredient',
            'quantities.measurement',
            'likes',
            'images',
            'tags',
            'user',
            'course',
            'comments.likes',
            'comments.user',
        ])->findOrFail($id);

        return new RecipeResource($recipe);
    }

    public function userRecipes()
    {
        $user = Auth::user();

        $recipes = Recipe::where('user_id', $user->id)->get();

        return ProfileResource::collection($recipes);
    }

    public function likedRecipes()
    {
        $user = Auth::user();

        return ProfileResource::collection($user->likedRecipes);
    }
    public function main()
    {
        $now = Carbon::now();

        // Legjobbak - összes like alapján
        $topRecipes = Recipe::withCount('likes')
            ->orderByDesc('likes_count')
            ->take(3)
            ->get();

        // Felkapott receptek - aktuális hónap like-jai alapján
        $popularRecipes = Recipe::whereHas('likes', function ($query) use ($now) {
            $query->whereYear('like_date', $now->year)
                ->whereMonth('like_date', $now->month);
        })
            ->withCount(['likes as monthly_likes' => function ($query) use ($now) {
                $query->whereYear('like_date', $now->year)
                    ->whereMonth('like_date', $now->month);
            }])
            ->orderByDesc('monthly_likes')
            ->take(3)
            ->get();

        // Random recept
        $randomRecipe = Recipe::inRandomOrder()->first();

        return response()->json([
            'popular' => RecipeResource::collection($popularRecipes),
            'top' => RecipeResource::collection($topRecipes),
            'random' => new RecipeResource($randomRecipe),
        ]);
    }

}




