"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
            .then((res) => res.json())
            .then((data) => setRecipes(data.data))
            .catch((err) => console.error("❌ Fetch error:", err.message));
    }, []);

    const featured = recipes.slice(0, 3);
    const topRated = recipes.slice(3, 5);

    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <span key={i}>⭐</span>
        ));
    };

    return (
        <div className="bg-rose-300 min-h-screen text-white">
            {/* Header */}
            <header className="bg-gray-900 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tastyfiee</h1>
                <nav className="flex gap-6">
                    <a href="#">Otthon</a>
                    <a href="#">Receptek</a>
                    <a href="#">Recept beküldése</a>
                    <a href="#">Profil</a>
                    <a href="#">Team</a>
                    <a href="#" className="text-sm">Bejelentkezés</a>
                    <a href="#" className="text-sm">Regisztráció</a>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative">
                <img
                    src="/images/hero.jpg"
                    alt="Hero"
                    className="w-full h-96 object-cover"
                />
                <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white bg-black/50 p-4 rounded text-center">
                    Üdvözöljük a Tastyfiee weboldalán!
                </h2>
            </section>

            {/* Kereső */}
            <section className="text-center p-6">
                <h3 className="text-xl font-semibold">Fedezz fel új recepteket!</h3>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    className="mt-4 p-2 rounded text-black"
                />
            </section>

            {/* Felkapott */}
            <section className="py-10 bg-rose-400 rounded-t-3xl px-8">
                <h2 className="text-4xl font-bold text-center mb-6 border-b-2 border-black">
                    Felkapott receptek
                </h2>
                <div className="flex gap-6 flex-wrap justify-center">
                    {featured.map((recipe, i) => (
                        <div key={i} className="bg-white text-black rounded-xl p-4 w-60">
                            <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="rounded-xl mb-2 h-40 object-cover w-full"
                            />
                            <p className="text-center font-semibold">{recipe.title}</p>
                            <div className="text-center">{renderStars(recipe.rating)}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Legjobbak */}
            <section className="py-10 bg-rose-500 rounded-b-3xl px-8">
                <h2 className="text-4xl font-bold text-center mb-6 border-b-2 border-black">
                    Legjobbak
                </h2>
                <div className="flex gap-6 flex-wrap justify-center">
                    {topRated.map((recipe, i) => (
                        <div key={i} className="bg-white text-black rounded-xl p-4 w-60">
                            <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="rounded-xl mb-2 h-40 object-cover w-full"
                            />
                            <p className="text-center font-semibold">{recipe.title}</p>
                            <div className="text-center">{renderStars(recipe.rating)}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-6 mt-10">
                <div className="flex justify-between flex-wrap">
                    <div>
                        <h3 className="text-xl font-bold">Tastyfiee</h3>
                        <div className="flex gap-2 mt-2">
                            <a href="#">📷</a>
                            <a href="#">📘</a>
                            <a href="#">📺</a>
                            <a href="#">📸</a>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p>Contact</p>
                        <p>Support</p>
                        <p>Privacy</p>
                        <p>Terms</p>
                    </div>
                    <div className="space-y-1">
                        <p>Kategóriák</p>
                        <p>Felkapott receptek</p>
                        <p>Legjobbak</p>
                    </div>
                    <div className="space-y-1">
                        <p>Site Links</p>
                        <p>Team</p>
                        <p>Log in</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
