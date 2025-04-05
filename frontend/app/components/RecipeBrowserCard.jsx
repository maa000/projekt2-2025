export default function RecipeBrowserCard({ recipe, onSelect }) {
    return (
        <div
            className="bg-white text-black rounded-xl p-4 shadow-md w-72 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onSelect(recipe)}
        >
            <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-md h-40 w-full object-cover mb-3"
            />
            <h3 className="text-lg font-bold mb-1">{recipe.title}</h3>
            <p className="text-sm text-gray-600">Elkészítési idő: {recipe.time} perc</p>
            <div className="text-yellow-500 mt-1">
                {"⭐".repeat(recipe.rating)}
            </div>
        </div>
    );
}
