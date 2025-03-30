<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('recipe_steps', function (Blueprint $table) {

            $table->id('step_id');
            $table->unsignedBigInteger('recipe_id');
            $table->integer('step_number');
            $table->text('step_description');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_steps');
    }
};

