<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>$this->faker->sentence(3),
            'image_url'=>$this->faker->imageUrl(),
            'rating'=>$this->faker->numberBetween(1,5),
            'views'=>$this->faker->numberBetween(0,999),
        ];
    }
}
