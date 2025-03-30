<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('courses')->insert([
            ['course_name' => 'Előétel'],
            ['course_name' => 'Főétel'],
            ['course_name' => 'Desszert'],
        ]);
    }
}
