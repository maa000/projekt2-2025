export default function RecipeSection({ title, recipes, bgColor = "bg-rose-400", rounded = "" }) {
    if (!recipes || recipes.length === 0) {
        return (
            <section className={`py-10 px-6 text-center ${bgColor} ${rounded}`}>
                <h2 className="text-4xl font-bold mb-6 underline decoration-black underline-offset-4">
                    {title}
                </h2>
                <p className="text-black">Nincs elérhető recept.</p>
            </section>
        );
    }

    return (
        <section className={`py-10 px-6 text-center ${bgColor} ${rounded}`}>
            <h2 className="text-4xl font-bold mb-6 underline decoration-black underline-offset-4">
                {title}
            </h2>
            <div className="flex gap-6 flex-wrap justify-center">
                {recipes.map((recipe, i) => (
                    <div
                        key={i}
                        className="bg-pink-100 text-black rounded-full px-6 py-4 shadow-md w-60 text-center"
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-40 object-cover rounded-full mb-3"
                        />
                        <p className="font-semibold text-lg">{recipe.title}</p>
                        <div className="text-yellow-500">
                            {"⭐".repeat(recipe.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
