<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->recipe_id,
            'title' => $this->recipe_name,
            'description' => $this->recipe_description,
            'image_url' => $this->images?->image_url ?? null,
            'rating' => $this->likes_count ?? 0,
            'ingredients' => $this->quantities->map(function ($q) {
                return [
                    'name' => $q->ingredient->ingredient_name ?? '',
                    'quantity' => $q->ingredient_quantity,
                    'unit' => $q->measurement->measurement_name ?? ''
                ];
            }),
            'tags' => $this->tags->map(fn($tag) => ['name' => $tag->tag_name]),
            'user_name' => $this->user->name ?? '',
            'course_name' => $this->course->course_name ?? '',
            'prep_time' => $this->prep_time,
            'cook_time' => $this->cook_time,
        ];
    }
}
