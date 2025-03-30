<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quantity', function (Blueprint $table) {

            $table->id('quantity_id');
            $table->unsignedBigInteger('recipe_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->unsignedBigInteger('measurement_id');
            $table->float('ingredient_quantity');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
            $table->foreign('ingredient_id')->references('ingredient_id')->on('ingredients');
            $table->foreign('measurement_id')->references('measurement_id')->on('measurements');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quantity');
    }
};

