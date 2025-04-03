export default function Hero() {
    return (
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
    );
}
