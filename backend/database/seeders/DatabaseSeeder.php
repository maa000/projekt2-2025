<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Recipe;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Ürítjük a táblát (ha van)
        DB::table('recipes')->truncate();

        // Feltöltés teszt adatokkal
        Recipe::create([
            'title' => 'Sült csirke',
            'image_url' => '/images/1.jpg',
            'rating' => 4.5,
            'views' => 120
        ]);

        Recipe::create([
            'title' => 'Gulyásleves',
            'image_url' => '/images/2.jpg',
            'rating' => 5,
            'views' => 200
        ]);

        Recipe::create([
            'title' => 'Rántott sajt',
            'image_url' => '/images/3.jpg',
            'rating' => 3.5,
            'views' => 80
        ]);
    }
}


