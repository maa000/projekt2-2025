'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [top, setTop] = useState([]);
    const [random, setRandom] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/home`)
            .then(res => res.json())
            .then(data => {
                setPopular(data.popular || []);
                setTop(data.top || []);
                setRandom(data.random || null);
            })
            .catch(err => console.error("Fetch error:", err.message));
    }, []);

    return (
        <section className="px-8 py-10 bg-rose-400 min-h-screen">
            <div className="bg-gray-800 text-white text-center py-12 mb-8">
                < Hero/>
                <h1 className="text-3xl font-bold">Üdvözlünk a Tastyfiee weboldalán!</h1>
                <p className="mt-2 text-lg">Új étel felfedezésére és keresésére</p>
                <button
                    onClick={() => {
                        if (random && random.recipe_id) {
                            router.push(`/recipes/${random.recipe_id}`);
                        }
                    }}
                    className="mt-4 px-4 py-2 bg-white text-gray-800 rounded shadow"
                >
                    Random Recept
                </button>
            </div>

            <h2 className="text-3xl font-bold text-center mb-4">Felkapott receptek</h2>
            <div className="flex flex-wrap gap-6 justify-center mb-10">
                {popular.map((recipe) => (
                    <RecipeCard
                        key={recipe.recipe_id}
                        id={recipe.recipe_id}
                        title={recipe.recipe_name}
                        image_url={recipe.image_url}
                        rating={recipe.likes_count}
                    />
                ))}
            </div>

            <h2 className="text-3xl font-bold text-center mb-4">Legjobbak</h2>
            <div className="flex flex-wrap gap-6 justify-center">
                {top.map((recipe) => (
                    <RecipeCard
                        key={recipe.recipe_id}
                        id={recipe.recipe_id}
                        title={recipe.recipe_name}
                        image_url={recipe.image_url}
                        rating={recipe.likes_count}
                    />
                ))}
            </div>
        </section>
    );
}
