'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import '@/app/globals.css';

export default function SubmitRecipePage() {
    const [recipeName, setRecipeName] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }])
    const [steps, setSteps] = useState([''])

    const [categoryList, setCategoryList] = useState([])
    const [courseList, setCourseList] = useState([])
    const [ingredientsList, setIngredientsList] = useState([])
    const [measurementsList, setMeasurementsList] = useState([])

    useEffect(() => {
        api.get('/api/recipe-form-data')
            .then(res => {
                setCategoryList(res.data.categories)
                setCourseList(res.data.courses)
                setIngredientsList(res.data.ingredients)
                setMeasurementsList(res.data.measurements)
            })
            .catch(err => console.error('Dropdown adatok hiba:', err))
    }, [])

    const handleIngredientChange = (index, field, value) => {
        const updated = [...ingredients]
        updated[index][field] = value
        setIngredients(updated)
    }

    const handleStepChange = (index, value) => {
        const updated = [...steps]
        updated[index] = value
        setSteps(updated)
    }

    const addIngredient = () => setIngredients([...ingredients, { name: '', amount: '', unit: '' }])
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index))

    const addStep = () => setSteps([...steps, ''])
    const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index))

    const toTimeString = (totalMinutes) => {
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
        const minutes = String(totalMinutes % 60).padStart(2, '0')
        return `${hours}:${minutes}:00`
    }

    const handleSubmit = async () => {
        try {
            await api.get('/sanctum/csrf-cookie')

            const formData = new FormData()
            formData.append('recipe_name', recipeName)
            formData.append('cuisine', cuisine)
            formData.append('food_category_id', selectedCategory)
            formData.append('course_id', selectedCourse)
            formData.append('prep_time', prepTime + ':00')
            formData.append('cook_time', cookTime + ':00')
            formData.append('recipe_description', description)
            if (image) {
                formData.append('image', image) // 🔧 image_url helyett image!
            }

            ingredients.forEach((ing, i) => {
                formData.append(`ingredients[${i}][name]`, ing.name)
                formData.append(`ingredients[${i}][amount]`, ing.amount)
                formData.append(`ingredients[${i}][unit]`, ing.unit)
            })

            steps.forEach((step, i) => {
                formData.append(`steps[${i}]`, step)
            })

            await api.post('/api/recipes-data', formData)
            alert('Recept sikeresen beküldve!')
        } catch (err) {
            if (err.response) {
                // Laravel válasz JSON objektummal
                console.error('Válasz hiba:', err.response.data)
                alert(
                    'Hiba a recept beküldésekor:\n' +
                    (typeof err.response.data.message === 'string'
                        ? err.response.data.message
                        : JSON.stringify(err.response.data.errors || err.response.data))
                )
            } else if (err.request) {
                console.error('Nincs válasz a szervertől:', err.request)
                alert('A szerver nem válaszolt. Ellenőrizd a kapcsolatot.')
            } else {
                console.error('Kliensoldali hiba:', err.message)
                alert('Hiba történt: ' + err.message)
            }
        }
    }

    return (
        <main className=" min-h-screen px-4 py-10">
            <div className="bg-radial-[at_50%_75%] from-brownUltra to-brownlight/80 max-w-4xl mx-auto p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-center bg-brownlight text-black mb-6 p-2 rounded-lg shadow">
                    Recept beküldése
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="Étel neve" className="w-full border px-3 py-2 rounded bg-brownlight" />
                    <input value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="Konyha típusa" className="w-full border px-3 py-2 rounded bg-brownlight" />
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border px-3 py-2 rounded bg-brownlight">
                        <option value="">Válassz kategóriát</option>
                        {categoryList.map(cat => (
                            <option key={cat.food_category_id} value={cat.food_category_id}>
                                {cat.food_category_name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full border px-3 py-2 rounded bg-brownlight">
                        <option value="">Válassz fogást</option>
                        {courseList.map(course => (
                            <option key={course.course_id} value={course.course_id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="time"
                        value={prepTime}
                        onChange={e => setPrepTime(e.target.value)}
                        className="w-full border px-3 py-2 rounded bg-brownlight"
                    />
                    <input
                        type="time"
                        value={cookTime}
                        onChange={e => setCookTime(e.target.value)}
                        className="w-full border px-3 py-2 rounded bg-brownlight"
                    />
                </div>

                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Leírás" rows={4} className="w-full border px-3 py-2 rounded bg-brownlight mb-6" />

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Kép feltöltése</label>
                    {image ? (
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {typeof window !== 'undefined' && (
                                <img src={URL.createObjectURL(image)} alt="Előnézet" className="w-64 h-40 object-cover rounded shadow" />
                            )}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-black">{image.name}</p>
                                <button type="button" onClick={() => setImage(null)} className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded shadow text-sm">Kép törlése</button>
                            </div>
                        </div>
                    ) : (
                        <label className="block cursor-pointer w-full max-w-xs text-center px-6 py-3 bg-brownCoffee text-white hover:bg-brownlight hover:text-black rounded-md shadow transition">
                            Kép kiválasztása
                            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
                        </label>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Hozzávalók</h2>
                    <div className="space-y-3 ">
                        {ingredients.map((item, index) => (
                            <div key={index} className="flex flex-wrap gap-2">
                                <select value={item.name} onChange={e => handleIngredientChange(index, 'name', e.target.value)} className="w-1/3 min-w-[120px] border px-3 py-2 rounded bg-brownlight">
                                    <option value="">Válassz hozzávalót</option>
                                    {ingredientsList.map(ingredient => (
                                        <option key={ingredient.ingredient_id} value={ingredient.ingredient_name}>
                                            {ingredient.ingredient_name}
                                        </option>
                                    ))}
                                </select>
                                <input type="text" placeholder="Menny." value={item.amount} onChange={e => handleIngredientChange(index, 'amount', e.target.value)} className="w-20 border px-3 py-2 rounded bg-brownlight text-center" />
                                <select value={item.unit} onChange={e => handleIngredientChange(index, 'unit', e.target.value)} className="w-24 border px-3 py-2 rounded bg-brownlight text-center">
                                    <option value="">Egység</option>
                                    {measurementsList.map(measure => (
                                        <option key={measure.measurement_id} value={measure.measurement_name}>
                                            {measure.measurement_name}
                                        </option>
                                    ))}
                                </select>
                                {ingredients.length > 1 && (
                                    <button onClick={() => removeIngredient(index)} className="px-4 py-1 bg-red-100 transition hover:bg-red-200 text-red-700 rounded shadow text-sm">Törlés</button>
                                )}
                            </div>
                        ))}
                        <button onClick={addIngredient} className="text-sm px-6 py-3 bg-brownCoffee text-white transition hover:bg-brownlight hover:text-black rounded shadow">+ Új hozzávaló</button>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Lépések</h2>
                    <div className="space-y-3">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <textarea placeholder={`Lépés ${index + 1}`} value={step} onChange={e => handleStepChange(index, e.target.value)} className="w-full border px-3 py-2 rounded bg-brownlight" rows={2} />
                                {steps.length > 1 && (
                                    <button onClick={() => removeStep(index)} className=" px-4 py-1 bg-red-100 transition hover:bg-red-200 text-red-700 rounded shadow text-sm">Törlés</button>
                                )}
                            </div>
                        ))}
                        <button onClick={addStep} className="text-sm px-6 py-3 bg-brownCoffee text-white transition hover:bg-brownlight hover:text-black rounded">+ Új lépés</button>
                    </div>
                </div>

                <div className="text-center">
                    <button onClick={handleSubmit} type="button" className="bg-brownCoffee text-white transition hover:bg-brownlight hover:text-black px-8 py-3 rounded-md text-lg font-semibold shadow-md">
                        Recept beküldése
                    </button>
                </div>
            </div>
        </main>
    )
}
