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
            </div>
        </section>
    );
}
