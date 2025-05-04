<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'comment_id' => $this->comment_id,
            'user_name' => $this->user->username ?? 'Ismeretlen',
            'comment_text' => $this->comment_text,
            'comment_date' => $this->comment_date,
            'likes_count' => $this->likes_count ?? 0,
        ];
    }
}
