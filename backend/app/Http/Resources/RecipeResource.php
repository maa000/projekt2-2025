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
            'recipe_id' => $this->recipe_id,
            'title' => $this->recipe_name,
            'description' => $this->recipe_description,
            'image_url' => $this->images->image_url,
            'rating' => $this->likes_count,
            'cuisine' =>$this->cuisine,
            'prep_time'=>$this->prep_time,
            'cook_time'=>$this->cook_time,
            'course' =>$this->courses->course_name,
            'upload_date'=>$this->upload_date,
            'user_id'=>$this->user_id
//            'steps' =>$this->recipe_steps->recipe_step_name
        ];
    }
}
