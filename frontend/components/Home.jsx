import Hero from "./Hero";
import RecipeSection from "./RecipeSection";


export default function Home() {
    const featured = [
        { title: "Tejszínes csirke", image: "https://via.placeholder.com/300x200", rating: 1 },
        { title: "Spagetti Bolognese", image: "https://via.placeholder.com/300x200", rating: 2 },
        { title: "Rántott sajt", image: "https://via.placeholder.com/300x200", rating: 3 },
    ];

    const topRated = [
        { title: "Gulyásleves", image: "https://via.placeholder.com/300x200", rating: 5 },
        { title: "Töltött paprika", image: "https://via.placeholder.com/300x200", rating: 4 },
        { title: "Lecsó kolbásszal", image: "https://via.placeholder.com/300x200", rating: 3 },
    ];

    return (
        <div className="bg-rose-300 min-h-screen text-white">
            <Hero />
            <RecipeSection title="Felkapott receptek" recipes={featured} />
            <RecipeSection title="Legjobbak" recipes={topRated} />
        </div>
    );
}
