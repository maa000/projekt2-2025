<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('food_categories', function (Blueprint $table) {

            $table->id('food_category_id');
            $table->string('food_category_name');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('food_category');
    }
};
