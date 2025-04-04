export default function RegisterForm() {
    return (
        <div className="bg-rose-400 min-h-screen flex items-center justify-center text-black p-4">
            <div className="bg-gray-900 p-8 rounded-3xl max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Regisztráció</h2>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Felhasználónév"
                        className="bg-white text-black w-full p-3 rounded"
                    />
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
                    <input
                        type="password"
                        placeholder="Jelszó megerősítése"
                        className="bg-white text-black w-full p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-white text-black font-semibold w-full py-3 rounded-xl shadow hover:bg-gray-200 mt-4"
                    >
                        Regisztrálás
                    </button>
                </form>

                <p className="text-sm text-center text-gray-300 mt-6">
                    By using our website you agree to our{" "}
                    <a href="#" className="text-white underline hover:text-rose-200">
                        Terms of use
                    </a>
                </p>
            </div>
        </div>
    );
}
