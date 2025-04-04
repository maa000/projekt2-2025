import { useState } from "react";
import IngredientInput from "./IngredientInput";
import ImageUpload from "./ImageUpload";

export default function SubmitForm() {
    const [ingredients, setIngredients] = useState([
        { name: "hozzávalo", amount: "10", unit: "mértékegység" },
        { name: "", amount: "", unit: "" },
        { name: "", amount: "", unit: "" },
        { name: "", amount: "", unit: "" },
        { name: "", amount: "", unit: "" },
        { name: "", amount: "", unit: "" }
    ]);

    const [title, setTitle] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState(null);

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, ingredients, instructions, image });
        alert("Recept elküldve! 🧑‍🍳");
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-rose-400 min-h-screen text-center text-black">
            <h1 className="text-4xl font-extrabold mb-6 italic">Recept Beküldése</h1>

            <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-3xl mx-auto mb-8">
                <label className="block mb-4 font-semibold text-lg">Étel neve:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white text-black px-4 py-2 rounded w-full mb-6"
                />

                <h2 className="text-xl mb-2 font-semibold">Hozzávalók</h2>
                <div className="space-y-2">
                    {ingredients.map((ingredient, i) => (
                        <IngredientInput
                            key={i}
                            index={i}
                            ingredient={ingredient}
                            onChange={handleIngredientChange}
                        />
                    ))}
                </div>

                <ImageUpload onImageSelect={setImage} />
            </div>

            <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-3xl mx-auto mb-8">
                <label className="block mb-2 font-semibold text-lg">Készítési Leírás</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="bg-white w-full h-40 p-4 text-black rounded resize-none"
                    placeholder="Írd le a recept elkészítésének lépéseit..."
                />
            </div>

            <button
                type="submit"
                className="bg-white text-black font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-200"
            >
                Beküldés
            </button>
        </form>
    );
}
