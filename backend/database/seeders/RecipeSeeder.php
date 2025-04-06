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
            [
                'user_id' => 2,
                'course_id' => 1,
                'food_category_id' => 1,
                'recipe_name' => 'Görög saláta',
                'recipe_description' => 'Frissítő saláta feta sajttal és olívabogyóval.',
                'cuisine' => 'Görög',
                'prep_time' => '00:10:00',
                'cook_time' => '00:00:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 3,
                'course_id' => 2,
                'food_category_id' => 2,
                'recipe_name' => 'Marhahúsos taco',
                'recipe_description' => 'Fűszeres marhahússal töltött mexikói taco.',
                'cuisine' => 'Mexikói',
                'prep_time' => '00:20:00',
                'cook_time' => '00:15:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 4,
                'course_id' => 3,
                'food_category_id' => 3,
                'recipe_name' => 'Csokoládé mousse',
                'recipe_description' => 'Gazdag és krémes csokoládé desszert.',
                'cuisine' => 'Francia',
                'prep_time' => '00:15:00',
                'cook_time' => '00:10:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 5,
                'course_id' => 1,
                'food_category_id' => 1,
                'recipe_name' => 'Caprese saláta',
                'recipe_description' => 'Paradicsom, mozzarella és bazsalikom saláta.',
                'cuisine' => 'Olasz',
                'prep_time' => '00:10:00',
                'cook_time' => '00:00:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'course_id' => 2,
                'food_category_id' => 2,
                'recipe_name' => 'Sertéspörkölt',
                'recipe_description' => 'Hagyományos magyar sertéspörkölt nokedlivel.',
                'cuisine' => 'Magyar',
                'prep_time' => '00:20:00',
                'cook_time' => '01:00:00',
                'upload_date' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'course_id' => 3,
                'food_category_id' => 3,
                'recipe_name' => 'Tiramisu',
                'recipe_description' => 'Klasszikus olasz desszert kávéval és mascarponével.',
                'cuisine' => 'Olasz',
                'prep_time' => '00:30:00',
                'cook_time' => '00:00:00',
                'upload_date' => Carbon::now(),
            ],

        ]);
    }
}

