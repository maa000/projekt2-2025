<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'recipe_id' => $this->recipe_id,
            'user_id' => $this->user_id,
            'course_id' => $this->course_id,
            'food_category_id' => $this->food_category_id,
            'recipe_name' => $this->recipe_name,
            'recipe_description' => $this->recipe_description,
            'cuisine' => $this->cuisine,
            'prep_time' => $this->prep_time,
            'cook_time' => $this->cook_time,
            'upload_date' => $this->upload_date,
            'likes_count' => $this->likes->count(),
            'image_url' =>$this->images->image_url,
            'steps' => $this->steps->map(function ($step) {
                return [
                    'step_id' => $step->step_id,
                    'step_number' => $step->step_number,
                    'step_description' => $step->step_description,
                ];
            }),
            'ingredients' => $this->ingredients->pluck('ingredient_name'),
            'quantities' => $this->quantities->map(function ($quantity) {
                return [
                    'quantity_id' => $quantity->quantity_id,
                    'ingredient' => $quantity->ingredient->ingredient_name,
                    'quantity' => $quantity->ingredient_quantity,
                    'measurement' => $quantity->measurement->measurement_name
                ];
            })
        ];
    }
}

