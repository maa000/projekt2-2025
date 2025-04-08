<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('measurements')->insert([
            ['measurement_name' => 'kilogramm'],
            ['measurement_name' => 'gramm'],
            ['measurement_name' => 'dekagramm'],
            ['measurement_name' => 'liter'],
            ['measurement_name' => 'milliliter'],
            ['measurement_name' => 'teáskanál'],
            ['measurement_name' => 'evőkanál'],
            ['measurement_name' => 'csipet'],
            ['measurement_name' => 'csésze'],
            ['measurement_name' => 'bögre'],
            ['measurement_name' => 'darab'],
            ['measurement_name' => 'csokor'],
            ['measurement_name' => 'fej'],
            ['measurement_name' => 'gerezd'],
            ['measurement_name' => 'szelet'],
            ['measurement_name' => 'marék'],
            ['measurement_name' => 'kiskanál'],
            ['measurement_name' => 'nagykanál'],
            ['measurement_name' => 'pohár'],
            ['measurement_name' => 'üveg'],
            ['measurement_name' => 'doboz'],
            ['measurement_name' => 'csomag'],
        ]);
    }
}
