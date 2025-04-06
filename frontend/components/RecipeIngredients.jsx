export default function RecipeIngredients() {
    const ingredients = [
        "500g csirkeszárny",
        "2 evőkanál olívaolaj",
        "1 teáskanál paprika",
        "Só, bors ízlés szerint",
        "1 gerezd fokhagyma"
    ];

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Hozzávalók</h2>
            <ul className="list-disc list-inside text-white">
                {ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
