'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState("home"); // 👈 kezdetben főoldal
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
            .then((res) => res.json())
            .then((data) => setRecipes(data.data))
            .catch((err) => console.error("Fetch error:", err.message));
    }, []);


    return (
        <section className="px-8 py-10 bg-violet-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-black">
                Receptek
            </h2>
            <div className="flex gap-6 flex-wrap justify-center">
                {recipes.map((recipe, i) => (
                    <RecipeCard
                        key={i}
                        id={recipe.id}
                        title={recipe.title}
                        image_url={recipe.image_url}
                        rating={recipe.rating}
                    />
                ))}
            </div>
        </section>
    );
}
