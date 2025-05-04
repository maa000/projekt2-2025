<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\CommentLike;

class CommentLikeController extends Controller
{
    public function toggle($commentId)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $existing = CommentLike::where('comment_id', $commentId)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['message' => 'Like removed', 'liked' => false]);
        }

        CommentLike::create([
            'comment_id' => $commentId,
            'user_id' => $user->id,
            'like_date' => now(),
        ]);

        return response()->json(['message' => 'Liked', 'liked' => true]);
    }
}
