<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RecipeSubmissionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_submit_recipe_with_image_ingredients_and_steps()
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $image = UploadedFile::fake()->image('test-recipe.jpg');

        $formData = [
            'recipe_name' => 'Teszt Recept',
            'recipe_description' => 'Ez egy tesztrecept leírása.',
            'cuisine' => 'Magyar',
            'prep_time' => '00:20:00',
            'cook_time' => '00:45:00',
            'course_id' => 1,
            'food_category_id' => 2,
            'image' => $image,

            'ingredients' => [
                ['name' => 'Cukor', 'amount' => 2, 'unit' => 1],
                ['name' => 'Liszt', 'amount' => 3, 'unit' => 2],
            ],

            'steps' => [
                ['step_description' => 'Első lépés'],
                ['step_description' => 'Második lépés'],
            ],
        ];

        $response = $this
            ->actingAs($user)
            ->postJson('/api/recipes-data', $formData);

        $response->assertStatus(201); // vagy 200, ha úgy van beállítva
        $this->assertDatabaseHas('recipes', [
            'recipe_name' => 'Teszt Recept',
            'user_id' => $user->id,
        ]);

        // Ellenőrizzük, hogy a kép valóban feltöltésre került
        Storage::disk('public')->assertExists('images/' . $image->hashName());
    }
}
