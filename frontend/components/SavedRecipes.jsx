export default function SavedRecipes() {
    const saved = [
        "Gulyásleves marhahússal",
        "Csokis brownie karamellel",
        "Sült padlizsán hummusszal"
    ];

    return (
        <div className="bg-gray-900 text-white p-4 rounded-3xl w-full max-w-sm">
            <h3 className="text-xl font-bold mb-2">Mentett Receptek</h3>
            <ul className="text-sm space-y-1">
                {saved.map((recipe, i) => (
                    <li key={i} className="border-b border-gray-700 py-1">{recipe}</li>
                ))}
            </ul>
        </div>
    );
}
