'use client';

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => <span key={i}>⭐</span>);
    };

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Nem sikerült betölteni az adatot");
                return res.json();
            })
            .then((data) => setRecipe(data.data))
            .catch((err) => setError(err.message));
    }, [id]);

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
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Konyha típusa:</span> {recipe.cuisine}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Előkészítés:</span> {recipe.prep_time}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Főzési idő:</span> {recipe.cook_time}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Értékelés:</span> <div className="text-center">{renderStars(recipe.likes_count)}</div></p>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Leírás</h2>
                        <p className="text-gray-700 leading-relaxed">{recipe.recipe_description}</p>
                    </div>
                </div>
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