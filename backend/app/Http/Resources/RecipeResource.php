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
            'title'=>$this->title,
            'image_url'=>$this->image_url,
            'rating'=>$this->rating,
            'views'=>$this->views,
        ];
    }
}
