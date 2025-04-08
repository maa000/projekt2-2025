<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeStepsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('recipe_steps')->insert([
            // Tejszínes csirke (recipe_id=1)
            ['recipe_id' => 1, 'step_number' => 1, 'step_description' => 'A csirkemellet vágjuk vékony szeletekre, sózzuk, borsozzuk.'],
            ['recipe_id' => 1, 'step_number' => 2, 'step_description' => 'Forró serpenyőben kevés olajon mindkét oldalát pirítsuk meg, majd tegyük félre.'],
            ['recipe_id' => 1, 'step_number' => 3, 'step_description' => 'A póréhagymát karikázzuk fel, és ugyanabban a serpenyőben pároljuk üvegesre.'],
            ['recipe_id' => 1, 'step_number' => 4, 'step_description' => 'Adjuk hozzá a zúzott fokhagymát, majd öntsük fel tejszínnel.'],
            ['recipe_id' => 1, 'step_number' => 5, 'step_description' => 'Tegyük vissza a csirkemelleket a serpenyőbe, és főzzük össze a mártással.'],
            ['recipe_id' => 1, 'step_number' => 6, 'step_description' => 'Tálaljuk friss petrezselyemmel megszórva.'],

            // Spagetti Bolognese (recipe_id=2)
            ['recipe_id' => 2, 'step_number' => 1, 'step_description' => 'A hagymát és fokhagymát aprítsuk fel, majd olívaolajon pároljuk üvegesre.'],
            ['recipe_id' => 2, 'step_number' => 2, 'step_description' => 'Adjunk hozzá darált marhahúst, és pirítsuk barnára.'],
            ['recipe_id' => 2, 'step_number' => 3, 'step_description' => 'Öntsük hozzá a paradicsomszószt, fűszerezzük sóval, borssal, oregánóval és bazsalikommal.'],
            ['recipe_id' => 2, 'step_number' => 4, 'step_description' => 'Főzzük lassú tűzön 20-30 percig, amíg a szósz besűrűsödik.'],
            ['recipe_id' => 2, 'step_number' => 5, 'step_description' => 'Közben főzzük ki a spagetti tésztát sós vízben.'],
            ['recipe_id' => 2, 'step_number' => 6, 'step_description' => 'Tálaljuk a tésztát a szósszal, reszelt parmezánnal megszórva.'],

            // Görög saláta (recipe_id=3)
            ['recipe_id' => 3, 'step_number' => 1, 'step_description' => 'A paradicsomot, uborkát és paprikát nagyobb darabokra vágjuk.'],
            ['recipe_id' => 3, 'step_number' => 2, 'step_description' => 'A lilahagymát vékony szeletekre vágjuk.'],
            ['recipe_id' => 3, 'step_number' => 3, 'step_description' => 'Egy tálban összekeverjük a zöldségeket, hozzáadjuk az olívabogyót.'],
            ['recipe_id' => 3, 'step_number' => 4, 'step_description' => 'Feta sajtot nagyobb kockákra vágjuk, és a salátára helyezzük.'],
            ['recipe_id' => 3, 'step_number' => 5, 'step_description' => 'Megszórjuk oregánóval, meglocsoljuk olívaolajjal és citromlével.'],
            ['recipe_id' => 3, 'step_number' => 6, 'step_description' => 'Óvatosan összeforgatjuk, majd tálaljuk.'],

            // Marhahúsos taco (recipe_id=4)
            ['recipe_id' => 4, 'step_number' => 1, 'step_description' => 'A darált marhahúst serpenyőben pirítsuk barnára.'],
            ['recipe_id' => 4, 'step_number' => 2, 'step_description' => 'Adjunk hozzá taco fűszerkeveréket és kevés vizet, majd főzzük össze.'],
            ['recipe_id' => 4, 'step_number' => 3, 'step_description' => 'A taco héjakat melegítsük elő a csomagolás utasításai szerint.'],
            ['recipe_id' => 4, 'step_number' => 4, 'step_description' => 'Töltsük meg a taco héjakat a húsos keverékkel.'],
            ['recipe_id' => 4, 'step_number' => 5, 'step_description' => 'Tetejére tehetünk reszelt sajtot, aprított salátát, paradicsomot és tejfölt.'],
            ['recipe_id' => 4, 'step_number' => 6, 'step_description' => 'Azonnal tálaljuk.'],

            // 5: Csokoládé mousse
            ['recipe_id' => 5, 'step_number' => 1, 'step_description' => 'Olvaszd fel a csokoládét vízgőz fölött.',],
            ['recipe_id' => 5, 'step_number' => 2, 'step_description' => 'Válaszd szét a tojásokat, és verd kemény habbá a fehérjét.',],
            ['recipe_id' => 5, 'step_number' => 3, 'step_description' => 'Keverd össze a tojássárgáját a felolvasztott csokoládéval.',],
            ['recipe_id' => 5, 'step_number' => 4, 'step_description' => 'Lassan forgasd bele a tojásfehérje habot.',],
            ['recipe_id' => 5, 'step_number' => 5, 'step_description' => 'Hűtsd legalább 2 órán át a hűtőben.',],

            // 6: Caprese saláta
            ['recipe_id' => 6, 'step_number' => 1, 'step_description' => 'Szeleteld fel a paradicsomot és a mozzarellát.',],
            ['recipe_id' => 6, 'step_number' => 2, 'step_description' => 'Helyezd őket váltakozva egy tálra.',],
            ['recipe_id' => 6, 'step_number' => 3, 'step_description' => 'Locsold meg olívaolajjal, szórd meg sóval és friss bazsalikommal.',],

            // 7: Sertéspörkölt
            ['recipe_id' => 7, 'step_number' => 1, 'step_description' => 'Kockázd fel a húst, és aprítsd fel a hagymát.',],
            ['recipe_id' => 7, 'step_number' => 2, 'step_description' => 'Pirítsd meg a hagymát, majd add hozzá a húst.',],
            ['recipe_id' => 7, 'step_number' => 3, 'step_description' => 'Fűszerezd pirospaprikával, sóval, borssal és fokhagymával.',],
            ['recipe_id' => 7, 'step_number' => 4, 'step_description' => 'Főzd fedő alatt, amíg a hús omlós nem lesz.',],

            // 8: Tiramisu
            ['recipe_id' => 8, 'step_number' => 1, 'step_description' => 'Keverd össze a tojássárgáját cukorral, majd add hozzá a mascarponét.',],
            ['recipe_id' => 8, 'step_number' => 2, 'step_description' => 'Verd kemény habbá a tojásfehérjét, majd forgasd bele.',],
            ['recipe_id' => 8, 'step_number' => 3, 'step_description' => 'Mártsd a babapiskótákat kávéba, és rétegezd egy tálba a krémmel felváltva.',],
            ['recipe_id' => 8, 'step_number' => 4, 'step_description' => 'Szórd meg kakaóporral, és pihentesd hűtőben pár órát.',]
        ]);
    }
}
