<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class RecipeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->recipe_name,
            'description' => $this->recipe_description,
            'image_url' => $this->images->first()?->image_url, // csak az első kép
            'rating' => $this->likes_count,
        ];
    }
}
