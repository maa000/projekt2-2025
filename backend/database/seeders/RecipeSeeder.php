<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Recipe;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('recipes')->truncate();

        Recipe::create([
            'title' => 'Teszktaja 1',
            'image_url' => '/images/1.jpg',
            'rating' => 5,
            'views' => 123,
        ]);

        Recipe::create([
            'title' => 'Teszktaja 2',
            'image_url' => '/images/2.jpg',
            'rating' => 4,
            'views' => 90,
        ]);

        Recipe::create([
            'title' => 'Teszktaja 3',
            'image_url' => '/images/3.jpg',
            'rating' => 3,
            'views' => 70,
        ]);
    }
}
