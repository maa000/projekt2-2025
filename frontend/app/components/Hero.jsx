export default function Hero() {
    return (
        <section className="relative text-white">
            <img
                src="/images/hero.jpg"
                alt="Hero"
                className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                    Üdvözöljük a Tastyfiee weboldalán!
                </h2>
                <p className="text-lg sm:text-xl mb-2">Új étel felfedezésére és keresésére</p>
                <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
                    Random Recept
                </button>
            </div>
        </section>
    );
}
