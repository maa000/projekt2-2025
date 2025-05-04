'use client';

import { useEffect, useState } from 'react';
import axios from '../../lib/axios'; // FONTOS: legyen beállítva withCredentials!

export default function SubmitRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const [ingredientsList, setIngredientsList] = useState([]);
    const [measurementsList, setMeasurementsList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
    const [steps, setSteps] = useState(['']);

    useEffect(() => {
        axios.get('/api/ingredients').then(res => setIngredientsList(res.data));
        axios.get('/api/measurements').then(res => setMeasurementsList(res.data));
        axios.get('/api/food-categories').then(res => setCategoryList(res.data));
        axios.get('/api/courses').then(res => setCourseList(res.data));
    }, []);

    const handleIngredientChange = (index, field, value) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);
    };

    const handleStepChange = (index, value) => {
        const updated = [...steps];
        updated[index] = value;
        setSteps(updated);
    };

    const addIngredient = () => setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
    const addStep = () => setSteps([...steps, '']);
    const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("recipe_name", recipeName);
        formData.append("cuisine", cuisine);
        formData.append("prep_time", prepTime);
        formData.append("cook_time", cookTime);
        formData.append("description", description);
        formData.append("food_category_id", selectedCategory);
        formData.append("course_id", selectedCourse);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("steps", JSON.stringify(steps));
        if (image) formData.append("image", image);

        try {
            await axios.get("/sanctum/csrf-cookie"); // CSRF token lekérés
            await axios.post("/api/recipes", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Recept sikeresen mentve!");
        } catch (err) {
            console.error("Beküldési hiba:", err);
            alert("Hiba történt a mentés során.");
        }
    };

    return (
        <main className="bg-violet-100 min-h-screen px-4 py-10">
            <div className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-black">
                    Recept beküldése
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="Étel neve" className="w-full border px-3 py-2 rounded bg-gray-100" />
                    <input value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="Konyha típusa" className="w-full border px-3 py-2 rounded bg-gray-100" />
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border px-3 py-2 rounded bg-gray-100">
                        <option value="">Válassz kategóriát</option>
                        {categoryList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full border px-3 py-2 rounded bg-gray-100">
                        <option value="">Válassz fogást</option>
                        {courseList.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                    </select>
                    <input value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="Előkészítési idő (00:15:00)" className="w-full border px-3 py-2 rounded bg-gray-100" />
                    <input value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="Főzési idő (00:30:00)" className="w-full border px-3 py-2 rounded bg-gray-100" />
                </div>

                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Leírás" rows={4} className="w-full border px-3 py-2 rounded bg-gray-100 mb-6" />

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Kép feltöltése</label>
                    {image ? (
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {typeof window !== 'undefined' && (
                                <img src={URL.createObjectURL(image)} alt="Előnézet" className="w-64 h-40 object-cover rounded shadow" />
                            )}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-gray-600">{image.name}</p>
                                <button type="button" onClick={() => setImage(null)} className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-md text-sm">Kép törlése</button>
                            </div>
                        </div>
                    ) : (
                        <label className="block cursor-pointer w-full max-w-xs text-center px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md shadow transition">
                            Kép kiválasztása
                            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
                        </label>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Hozzávalók</h2>
                    <div className="space-y-3">
                        {ingredients.map((item, index) => (
                            <div key={index} className="flex flex-wrap gap-2">
                                <select value={item.name} onChange={e => handleIngredientChange(index, "name", e.target.value)} className="w-1/3 min-w-[120px] border px-3 py-2 rounded bg-gray-100">
                                    <option value="">Válassz hozzávalót</option>
                                    {ingredientsList.map(ingredient => <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>)}
                                </select>
                                <input type="text" placeholder="Menny." value={item.amount} onChange={e => handleIngredientChange(index, "amount", e.target.value)} className="w-20 border px-3 py-2 rounded bg-gray-100 text-center" />
                                <select value={item.unit} onChange={e => handleIngredientChange(index, "unit", e.target.value)} className="w-24 border px-3 py-2 rounded bg-gray-100 text-center">
                                    <option value="">Egység</option>
                                    {measurementsList.map(measure => <option key={measure.id} value={measure.name}>{measure.name}</option>)}
                                </select>
                                {ingredients.length > 1 && (
                                    <button onClick={() => removeIngredient(index)} className="text-red-500 text-sm">Törlés</button>
                                )}
                            </div>
                        ))}
                        <button onClick={addIngredient} className="text-sm text-purple-700 hover:underline">+ Új hozzávaló</button>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Lépések</h2>
                    <div className="space-y-3">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <textarea placeholder={`Lépés ${index + 1}`} value={step} onChange={e => handleStepChange(index, e.target.value)} className="w-full border px-3 py-2 rounded bg-gray-100" rows={2} />
                                {steps.length > 1 && (
                                    <button onClick={() => removeStep(index)} className="text-red-500 text-sm">Törlés</button>
                                )}
                            </div>
                        ))}
                        <button onClick={addStep} className="text-sm text-purple-700 hover:underline">+ Új lépés</button>
                    </div>
                </div>

                <div className="text-center">
                    <button onClick={handleSubmit} type="button" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md transition">
                        Recept beküldése
                    </button>
                </div>
            </div>
        </main>
    );
}
