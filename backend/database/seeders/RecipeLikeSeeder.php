<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RecipeLikeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('recipe_likes')->insert([
            ['user_id' => 1, 'recipe_id' => 1, 'like_date' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 2, 'like_date' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 5, 'like_date' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 6, 'like_date' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 7, 'like_date' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 8, 'like_date' => Carbon::now()],
            ['user_id' => 2, 'recipe_id' => 2, 'like_date' => Carbon::now()],
            ['user_id' => 2, 'recipe_id' => 3, 'like_date' => Carbon::now()],
            ['user_id' => 2, 'recipe_id' => 4, 'like_date' => Carbon::now()],
            ['user_id' => 3, 'recipe_id' => 2, 'like_date' => Carbon::now()],
            ['user_id' => 3, 'recipe_id' => 3, 'like_date' => Carbon::now()],
            ['user_id' => 3, 'recipe_id' => 4, 'like_date' => Carbon::now()],
            ['user_id' => 4, 'recipe_id' => 2, 'like_date' => Carbon::now()],
            ['user_id' => 4, 'recipe_id' => 3, 'like_date' => Carbon::now()],
            ['user_id' => 5, 'recipe_id' => 2, 'like_date' => Carbon::now()],
            ['user_id' => 5, 'recipe_id' => 3, 'like_date' => Carbon::now()],
        ]);
    }
}

