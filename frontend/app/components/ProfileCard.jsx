export default function ProfileCard() {
    return (
        <div className="bg-gray-900 text-white p-6 rounded-3xl w-full max-w-sm flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white text-gray-400 flex items-center justify-center text-5xl mb-4">
                👤
            </div>
            <button className="bg-white text-black font-bold py-1 px-3 rounded mb-4">Felhasználói Név</button>

            <input
                type="text"
                placeholder="pl. user@email.com"
                className="bg-white text-black w-full mb-2 p-2 rounded"
            />
            <input
                type="text"
                placeholder="pl. +36 30 123 4567"
                className="bg-white text-black w-full mb-4 p-2 rounded"
            />

            <div className="bg-white text-black p-3 rounded w-full">
                <h4 className="font-semibold mb-2 text-center">Kedvelt Témák</h4>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                    {["Főtt ételek", "Csirkés ételek", "Teszt3", "Teszt4", "Teszt5", "Teszt6"].map((topic, i) => (
                        <span key={i} className="bg-gray-200 px-3 py-1 rounded-full">{topic}</span>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <button className="bg-rose-400 text-white px-4 py-2 rounded flex items-center gap-2">
                    <span>🔗</span> Share
                </button>
                <button className="bg-rose-400 text-white px-4 py-2 rounded">Edit</button>
            </div>

            <button className="mt-6 text-sm bg-red-600 text-white px-4 py-1 rounded">
                Profil Törlése
            </button>
        </div>
    );
}
