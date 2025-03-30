<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('recipe_tags', function (Blueprint $table) {

            $table->id('recipe_tag_id');
            $table->unsignedBigInteger('recipe_id');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
            $table->foreign('tag_id')->references('tag_id')->on('tags')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_tags');
    }
};

