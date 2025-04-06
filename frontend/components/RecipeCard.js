export default function RecipeCard({ title, image_url, rating }) {

    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => <span key={i}>⭐</span>);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={image_url || '/images/placeholder.jpg'} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <div className="text-center">{renderStars(rating)}</div>
            </div>
        </div>
    );
}
