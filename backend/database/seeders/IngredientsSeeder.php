<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientsSeeder extends Seeder
{
    public function run(): void
    {
        $ingredients = [
            'Csirkemellfilé',
            'Főzőtejszín',
            'Vöröshagyma',
            'Fokhagyma',
            'Olívaolaj',
            'Só',
            'Bors',
            'Petrezselyemzöld',
            'Spagetti tészta',
            'Darált marhahús',
            'Sárgarépa',
            'Zeller',
            'Paradicsompüré',
            'Bazsalikom',
            'Oregánó',
            'Parmezán sajt',
            'Paradicsom',
            'Kígyóuborka',
            'Lilahagyma',
            'Fekete olívabogyó',
            'Feta sajt',
            'Citromlé',
            'Taco fűszerkeverék',
            'Taco héj',
            'Avokádó',
            'Tejföl',
            'Lime',
            'Salátakeverék',
            'Jalapeño',
            'Reszelt sajt',
            'Friss koriander',
            'Étcsokoládé',
            'Tojás',
            'Cukor',
            'Habtejszín',
            'Tej',
            'Narancshéj',
            'Mandula',
            'Reszelt csokoládé',
            'Friss mentalevél',
            'Mozzarella sajt',
            'Balzsamecet',
            'Fehérbors',
            'Sertéshús (comb vagy lapocka)',
            'Zöldpaprika',
            'Sertészsír',
            'Őrölt pirospaprika',
            'Őrölt kömény',
            'Mascarpone',
            'Babapiskóta',
            'Feketekávé',
            'Rum',
            'Kakaópor',
            'Vaníliás cukor',
        ];

        foreach ($ingredients as $ingredient) {
            DB::table('ingredients')->insert([
                'ingredient_name' => $ingredient,
            ]);
        }
    }
}
