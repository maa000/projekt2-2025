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
            ['user_id' => 1, 'recipe_id' => 2, 'like_date' => Carbon::now()],
        ]);
    }
}

