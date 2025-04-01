<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id('recipe_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('course_id')->nullable();
            $table->unsignedBigInteger('food_category_id')->nullable();
            $table->string('recipe_name');
            $table->text('recipe_description');
            $table->string('cuisine');
            $table->time('prep_time');
            $table->time('cook_time');
            $table->timestamp('upload_date')->useCurrent();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('set null');
            $table->foreign('food_category_id')->references('food_category_id')->on('food_categories')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
