<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ImageSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('images')->insert([
            [
                'recipe_id' => 1,
                'image_url' => '/images/1.jpg',
                'upload_date' => Carbon::now(),
            ],
            [
                'recipe_id' => 2,
                'image_url' => '/images/2.jpg',
                'upload_date' => Carbon::now(),
            ],
        ]);
    }
}

