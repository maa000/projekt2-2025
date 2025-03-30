<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('food_categories')->insert([
            ['food_category_name' => 'Vegetáriánus'],
            ['food_category_name' => 'Húsos'],
            ['food_category_name' => 'Gluténmentes'],
        ]);
    }
}

