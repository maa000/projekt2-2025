import RecipeCard from "./RecipeCard";

export default function RecipeSection({ title, recipes, bgColor, rounded }) {
    return (
        <section className={`py-10 px-8 ${bgColor} ${rounded}`}>
            <h2 className="text-4xl font-bold text-center mb-6 border-b-2 border-black">
                {title}
            </h2>
            <div className="flex gap-6 flex-wrap justify-center">
                {recipes.map((recipe, i) => (
                    <RecipeCard key={i} recipe={recipe} />
                ))}
            </div>
        </section>
    );
}
