<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {

            $table->id('favorite_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_id');
            $table->timestamp('favorite_date');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};

