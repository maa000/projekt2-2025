'use client';
import { useEffect, useState } from 'react';

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/recipes')
            .then(res => res.json())
            .then(data => setRecipes(data))
            .catch(err => console.error('❌ Fetch error:', err.message));
    }, []);


    return (
        <main className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">📋 Recept lista</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id} className="mb-4 bg-gray-800 p-4 rounded">
                    <p className="font-bold">{recipe.title}</p>
                    <p>Rating: {recipe.rating} ⭐</p>
                    <p>Views: {recipe.views} 👁</p>
                </div>
            ))}
        </main>
    );
}
