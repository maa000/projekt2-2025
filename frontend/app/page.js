'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import '@/app/globals.css';

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
        <section className="px-8 py-10 bg-brownCoffee min-h-screen">
            <div className="bg-brownMiddle text-white text-center py-12 mb-8 shadow-lg rounded">
                < Hero/>
                <h1 className="text-3xl font-bold">Új étel felfedezésére és keresésére</h1>
                <button
                    onClick={() => {
                        if (random && random.recipe_id) {
                            router.push(`/recipes/${random.recipe_id}`);
                        }
                    }}
                    className="mt-4 px-4 py-2 bg-brownlight text-gray-800 rounded shadow"
                >
                    Random Recept
                </button>
            </div>

            <div className="bg-brownMiddle shadow-lg rounded" >
                <h2 className="text-3xl font-bold text-white text-center mb-4">Felkapott receptek</h2>
                <div className="flex flex-wrap justify-center gap-25 p-8 mb-10">
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
            </div>
            <div className="bg-brownMiddle shadow-lg rounded ">
                <h2 className="text-3xl font-bold text-white text-center mb-4">Legjobbak</h2>
                <div className="flex flex-wrap justify-center gap-25 p-8 mb-10">
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
            </div>
        </section>
    );
}
