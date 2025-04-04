export default function RecipeCard({ recipe }) {
    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => <span key={i}>⭐</span>);
    };

    return (
        <div className="bg-white text-black rounded-xl p-4 w-60">
            <img
                src={recipe.image_url}
                alt={recipe.title}
                className="rounded-xl mb-2 h-40 object-cover w-full"
            />
            <p className="text-center font-semibold">{recipe.title}</p>
            <div className="text-center">{renderStars(recipe.rating)}</div>
        </div>
    );
}
