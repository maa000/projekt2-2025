<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {

            $table->id('course_id');
            $table->string('course_name');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};

