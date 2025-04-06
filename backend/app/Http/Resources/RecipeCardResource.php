<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->recipe_id,
            'title' => $this->recipe_name,
            'image_url' => $this->images->image_url,
            'rating' => $this->likes_count
        ];
    }
}
