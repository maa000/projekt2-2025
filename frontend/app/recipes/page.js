'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard';
import '@/app/globals.css';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [ingredientInputs, setIngredientInputs] = useState(['']);
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [maxTotalTime, setMaxTotalTime] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
            .then((res) => res.json())
            .then((data) => {
                console.log("RECEIVED FROM BACKEND:", data.data[0]);
                setRecipes(data.data);
            })
            .catch((err) => console.error("Fetch error:", err.message));
    }, []);

    function timeToMinutes(timeStr) {
        if (!timeStr) return 0;
        const [h = 0, m = 0] = timeStr.split(':').map(Number);
        return h * 60 + m;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const fullText = `${recipe.title || ''} ${recipe.recipe_description || ''}`.toLowerCase();
        const totalTime = timeToMinutes(recipe.prep_time) + timeToMinutes(recipe.cook_time);

        const ingredientsOk = !ingredientInputs.some(input => input.trim()) ||
            ingredientInputs.every(input =>
                recipe.ingredients?.some(ing =>
                    ing.name?.toLowerCase().includes(input.trim().toLowerCase())
                )
            );

        return (
            (!searchQuery || fullText.includes(searchQuery.toLowerCase())) &&
            ingredientsOk &&
            (!selectedTag || recipe.tags?.some(tag => tag.name?.toLowerCase().includes(selectedTag.toLowerCase()))) &&
            (!selectedUser || recipe.user_name?.toLowerCase().includes(selectedUser.toLowerCase())) &&
            (!selectedCourse || recipe.course_name?.toLowerCase().includes(selectedCourse.toLowerCase())) &&
            (!maxTotalTime || totalTime <= parseInt(maxTotalTime))
        );
    });

    return (
        <section className="px-8 py-10 bg-brownCoffee min-h-screen">
            <h2 className="text-3xl text-white font-bold text-center mb-6 border-b-2 border-white" >Receptek</h2>

            <div className="bg-brownlight p-6 rounded-lg shadow-lg mb-10 max-w-5xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Keresőpanel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Keresés névben/leírásban..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="p-2 border rounded"
                    />
                    {ingredientInputs.map((input, idx) => (
                        <input
                            key={idx}
                            type="text"
                            placeholder={`Hozzávaló ${idx + 1}...`}
                            value={input}
                            onChange={e => {
                                const updated = [...ingredientInputs];
                                updated[idx] = e.target.value;
                                setIngredientInputs(updated);
                            }}
                            className="p-2 border rounded"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => setIngredientInputs([...ingredientInputs, ''])}
                        className="px-4 py-2 bg-brownCoffee text-white rounded"
                    >
                        + Új hozzávaló
                    </button>
                    <input
                        type="text"
                        placeholder="Tag..."
                        value={selectedTag}
                        onChange={e => setSelectedTag(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Felhasználó neve..."
                        value={selectedUser}
                        onChange={e => setSelectedUser(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Fogás típusa (course)..."
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max. össz. idő (perc)"
                        value={maxTotalTime}
                        onChange={e => setMaxTotalTime(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
            </div>

            <div className="flex gap-6 flex-wrap justify-center">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe, i) => (
                        <RecipeCard
                            key={i}
                            id={recipe.id}
                            title={recipe.title}
                            image_url={recipe.image_url}
                            rating={recipe.rating}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Nincs találat a megadott szűrésre.</p>
                )}
            </div>
        </section>
    );
}