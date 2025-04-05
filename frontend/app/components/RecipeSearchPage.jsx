import { useState } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeSearchPage({ onSelect }) {
    const [search, setSearch] = useState("");

    const recipes = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Recept ${i + 1}`,
        image: "https://via.placeholder.com/300x200",
        rating: Math.floor(Math.random() * 3) + 3,
        time: 20 + i * 5,
    }));

    const filteredRecipes = recipes.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-rose-300 min-h-screen p-6 text-white">
            <h1 className="text-3xl font-bold text-center mb-4">Receptgyűjtemény</h1>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Keresés receptek között..."
                    className="p-2 w-full max-w-md text-black rounded"
                />
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
}
