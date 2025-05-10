import Link from "next/link";
import '@/app/globals.css';
export default function RecipeCard({id, title, image_url, rating }) {

    return (
        <Link href={`/recipes/${id}`} className="block max-w-xs rounded-lg overflow-hidden shadow-lg bg-white hover:scale-110 transition-transform duration-300">
            <div className="bg-gradient-to-br from-brownUltra/80 to-brownlight/80 text-black border-brownlight rounded overflow-hidden shadow-lg">
                <img src={image_url} alt={title} className="w-70 h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl text-center font-bold">{title}</h2>
                    <div className="text-center">
                        <h3 className="text-lg font-bold">❤️({rating})</h3>

                    </div>
                </div>
            </div>
        </Link>
    );
}
