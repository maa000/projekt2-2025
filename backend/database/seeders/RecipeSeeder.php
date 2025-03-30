<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('recipes')->insert([
            [
                'user_id' => 1,
                'course_id' => 1,
                'food_category_id' => 1,
                'recipe_name' => 'Tejszínes csirke',
                'recipe_description' => 'Könnyű és ízletes tejszínes csirkemell recept.',
                'cuisine' => 'Magyar',
                'prep_time' => '00:20:00',
                'cook_time' => '00:30:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'course_id' => 2,
                'food_category_id' => 2,
                'recipe_name' => 'Spagetti Bolognese',
                'recipe_description' => 'Klasszikus olasz tésztaétel gazdag húsos szósszal.',
                'cuisine' => 'Olasz',
                'prep_time' => '00:15:00',
                'cook_time' => '00:40:00',
                'upload_date' => Carbon::now(),
            ],
        ]);
    }
}

