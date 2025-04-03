export default function IngredientInput({ index, ingredient, onChange }) {
    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={ingredient.name}
                onChange={(e) => onChange(index, "name", e.target.value)}
                className="bg-white text-black px-2 py-1 rounded w-1/2"
                placeholder="Hozzávaló"
            />
            <input
                type="number"
                value={ingredient.amount}
                onChange={(e) => onChange(index, "amount", e.target.value)}
                className="bg-white text-black px-2 py-1 rounded w-1/2"
                placeholder="Mennyiség"
            />
            <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => onChange(index, "unit", e.target.value)}
                className="bg-white text-black px-2 py-1 rounded w-1/2"
                placeholder="Egység"
            />
        </div>
    );
}
