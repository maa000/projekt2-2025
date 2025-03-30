<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {

            $table->id('image_id');
            $table->unsignedBigInteger('recipe_id');
            $table->text('image_url');
            $table->timestamp('upload_date');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};

