<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index($recipeId)
    {
        $comments = Comment::with('user')
            ->withCount('likes')
            ->where('recipe_id', $recipeId)
            ->orderBy('comment_date', 'desc')
            ->get();

        return response()->json($comments);
    }

    public function store(Request $request, $recipeId)
    {
        $request->validate(['comment_text' => 'required|string']);
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $comment = Comment::create([
            'recipe_id' => $recipeId,
            'user_id' => $user->id,
            'comment_text' => $request->comment_text,
            'comment_date' => now(),
        ]);

        return response()->json($comment, 201);
    }
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if (auth()->id() !== $comment->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}
