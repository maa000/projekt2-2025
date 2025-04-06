export default function LoginForm() {
    return (
        <div className="bg-rose-400 min-h-screen flex items-center justify-center text-black p-4">
            <div className="bg-gray-900 p-8 rounded-3xl max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Belépés</h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-white text-black w-full p-3 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Jelszó"
                        className="bg-white text-black w-full p-3 rounded"
                    />

                    <button
                        type="button"
                        className="block mx-auto text-xs text-white underline hover:text-rose-200"
                    >
                        Elfelejtettem a jelszót
                    </button>

                    <button
                        type="submit"
                        className="bg-white text-black font-semibold w-full py-3 rounded-xl shadow hover:bg-gray-200 mt-2"
                    >
                        Belépés
                    </button>
                </form>

                <div className="flex justify-center mt-6 gap-4 text-lg">
                    <span>📷</span>
                    <span>📘</span>
                    <span>📺</span>
                </div>
            </div>
        </div>
    );
}
