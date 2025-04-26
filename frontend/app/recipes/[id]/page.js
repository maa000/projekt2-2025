'use client';

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const { user } = useAuth(); // ← FONTOS: innen tudjuk, hogy be van-e jelentkezve
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Nem sikerült betölteni az adatot");
                return res.json();
            })
            .then((data) => {
                console.log("RECIPE API VÁLASZ:", data); // IDE rakd be
                setRecipe(data.data);
            })
            .catch((err) => setError(err.message));
    }, [id]);


    const handleLike = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post(`/api/recipes/${id}/like`);

            if (response.data.liked) {
                // Ha like lett, növeljük
                setRecipe(prev => ({
                    ...prev,
                    likes_count: (prev.likes_count || 0) + 1,
                }));
            } else {
                // Ha unlike lett, csökkentjük
                setRecipe(prev => ({
                    ...prev,
                    likes_count: Math.max((prev.likes_count || 1) - 1, 0),
                }));
            }
        } catch (error) {
            console.error("Hiba a likeolás közben:", error);
        }
    };


    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!recipe) return <p className="text-center">Betöltés...</p>;
    //console.log("Kép:", recipe.image_url);
    return (
        <section className="px-6 md:px-12 py-12 bg-violet-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
                {/* Bal oldalon a kép */}
                <div className="md:flex-shrink-0">
                    <img
                        src={recipe.image_url || "/images/placeholder.jpg"}
                        alt={recipe.recipe_name}
                        className="w-full md:w-96 h-64 md:h-full object-cover"
                    />
                </div>

                {/* Jobb oldalon a szöveg */}
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.recipe_name}</h1>
                    {user && (
                        <button
                            onClick={handleLike}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            ❤️ Like ({recipe.likes_count})
                        </button>
                    )}
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Konyha típusa:</span> {recipe.cuisine}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Előkészítés:</span> {recipe.prep_time}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Főzési idő:</span> {recipe.cook_time}</p>
                    {/*<p className="text-gray-600 mb-4"><span className="font-semibold">Likeok száma:</span> {recipe.likes_count}</p>*/}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Leírás</h2>
                        <p className="text-gray-700 leading-relaxed">{recipe.recipe_description}</p>
                    </div>
                </div>
            </div>
            {/* Hozzávalók */}
            <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Hozzávalók</h2>
                {recipe.quantities && recipe.quantities.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {recipe.quantities.map((quantity, index) => (
                            <li key={index}>
                                {quantity.quantity} {quantity.measurement} {quantity.ingredient}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Nincsenek hozzávalók ehhez a recepthez.</p>
                )}
            </div>
            <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Lépések</h2>

                {recipe.steps && recipe.steps.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                        {recipe.steps.map((step) => (
                            <li key={step.step_id}>
                                {step.step_description}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-gray-500">Ehhez a recepthez még nem tartoznak lépések.</p>
                )}
            </div>

        </section>

    );
}