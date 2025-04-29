import Link from "next/link";
export default function RecipeCard({id, title, image_url, rating }) {

    return (
        <Link href={`/recipes/${id}`} className="block max-w-xs rounded overflow-hidden shadow-lg bg-white hover:scale-110 transition-transform duration-300">
            <div className="border rounded-lg overflow-hidden shadow-lg">
                <img src={image_url || '/images/placeholder.jpg'} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <div className="text-center">
                        <h3 className="text-lg font-bold">Like:{rating}</h3>

                    </div>
                </div>
            </div>
        </Link>
    );
}
