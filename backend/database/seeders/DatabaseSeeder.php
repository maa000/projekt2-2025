<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Recipe;


class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CourseSeeder::class,
            FoodCategorySeeder::class,
            RecipeSeeder::class,
            RecipeLikeSeeder::class,
            ImageSeeder::class
        ]);
    }

}
