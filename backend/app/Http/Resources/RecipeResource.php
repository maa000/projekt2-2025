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
//        return parent::toArray($request);

        return[
            'title'=>$this->recipe_name,
            'image_url'=>$this->image_url,
            'rating'=>$this->like_count,
            'description'=>$this->recipe_description,
        ];
    }
}
