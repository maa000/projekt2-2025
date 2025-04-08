<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuantitySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('quantity')->insert([
            // Tejszínes csirke (recipe_id = 1)
            ['recipe_id' => 1, 'ingredient_id' => 1, 'measurement_id' => 11, 'ingredient_quantity' => 2],
            ['recipe_id' => 1, 'ingredient_id' => 2, 'measurement_id' => 4, 'ingredient_quantity' => 1],
            ['recipe_id' => 1, 'ingredient_id' => 5, 'measurement_id' => 14, 'ingredient_quantity' => 2],
            ['recipe_id' => 1, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],
            ['recipe_id' => 1, 'ingredient_id' => 8, 'measurement_id' => 2, 'ingredient_quantity' => 100],

            // Spagetti Bolognese (recipe_id = 2)
            ['recipe_id' => 2, 'ingredient_id' => 10, 'measurement_id' => 3, 'ingredient_quantity' => 30],
            ['recipe_id' => 2, 'ingredient_id' => 9, 'measurement_id' => 3, 'ingredient_quantity' => 50],
            ['recipe_id' => 2, 'ingredient_id' => 7, 'measurement_id' => 3, 'ingredient_quantity' => 30],
            ['recipe_id' => 2, 'ingredient_id' => 5, 'measurement_id' => 14, 'ingredient_quantity' => 2],
            ['recipe_id' => 2, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],

            // Görög saláta (recipe_id = 3)
            ['recipe_id' => 3, 'ingredient_id' => 11, 'measurement_id' => 11, 'ingredient_quantity' => 2],
            ['recipe_id' => 3, 'ingredient_id' => 12, 'measurement_id' => 11, 'ingredient_quantity' => 1],
            ['recipe_id' => 3, 'ingredient_id' => 13, 'measurement_id' => 11, 'ingredient_quantity' => 1],
            ['recipe_id' => 3, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],

            // Marhahúsos taco (recipe_id = 4)
            ['recipe_id' => 4, 'ingredient_id' => 15, 'measurement_id' => 3, 'ingredient_quantity' => 50],
            ['recipe_id' => 4, 'ingredient_id' => 14, 'measurement_id' => 11, 'ingredient_quantity' => 1],
            ['recipe_id' => 4, 'ingredient_id' => 13, 'measurement_id' => 11, 'ingredient_quantity' => 1],
            ['recipe_id' => 4, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],

            // Csokoládé mousse (recipe_id = 5)
            ['recipe_id' => 5, 'ingredient_id' => 18, 'measurement_id' => 3, 'ingredient_quantity' => 50],
            ['recipe_id' => 5, 'ingredient_id' => 19, 'measurement_id' => 11, 'ingredient_quantity' => 1],
            ['recipe_id' => 5, 'ingredient_id' => 20, 'measurement_id' => 11, 'ingredient_quantity' => 3],
            ['recipe_id' => 5, 'ingredient_id' => 21, 'measurement_id' => 5, 'ingredient_quantity' => 100],

            // Caprese saláta (recipe_id = 6)
            ['recipe_id' => 6, 'ingredient_id' => 23, 'measurement_id' => 11, 'ingredient_quantity' => 2],
            ['recipe_id' => 6, 'ingredient_id' => 24, 'measurement_id' => 12, 'ingredient_quantity' => 1],
            ['recipe_id' => 6, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],

            // Sertéspörkölt (recipe_id = 7)
            ['recipe_id' => 7, 'ingredient_id' => 25, 'measurement_id' => 3, 'ingredient_quantity' => 50],
            ['recipe_id' => 7, 'ingredient_id' => 5, 'measurement_id' => 14, 'ingredient_quantity' => 2],
            ['recipe_id' => 7, 'ingredient_id' => 6, 'measurement_id' => 6, 'ingredient_quantity' => 1],
            ['recipe_id' => 7, 'ingredient_id' => 8, 'measurement_id' => 2, 'ingredient_quantity' => 100],

            // Tiramisu (recipe_id = 8)
            ['recipe_id' => 8, 'ingredient_id' => 28, 'measurement_id' => 11, 'ingredient_quantity' => 2],
            ['recipe_id' => 8, 'ingredient_id' => 29, 'measurement_id' => 5, 'ingredient_quantity' => 100],
            ['recipe_id' => 8, 'ingredient_id' => 30, 'measurement_id' => 11, 'ingredient_quantity' => 2],
        ]);
    }
}
