'use client';

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import '@/app/globals.css';

export default function RecipeDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const { user } = useAuth(); // ← FONTOS: innen tudjuk, hogy be van-e jelentkezve
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Nem sikerült betölteni az adatot");
                return res.json();
            })
            .then((data) => {
                console.log("RECIPE API VÁLASZ:", data); // IDE rakd be
                setRecipe(data.data);
            })
            .catch((err) => setError(err.message));
    }, [id]);


    const handleLike = async () => {
        if (!user) {
            router.push('/login'); // vagy '/next/login', ha ott van a login oldal
            return;
        }

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post(`/api/recipes/${id}/like`);

            if (response.data.liked) {
                setRecipe(prev => ({
                    ...prev,
                    likes_count: (prev.likes_count || 0) + 1,
                }));
            } else {
                setRecipe(prev => ({
                    ...prev,
                    likes_count: Math.max((prev.likes_count || 1) - 1, 0),
                }));
            }
        } catch (error) {
            console.error("Hiba a likeolás közben:", error);
        }
    };
    const handleCommentSubmit = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post(`/api/comments/${id}`, {
                comment_text: newComment,
            });

            const res = await axios.get(`/api/recipes/${id}`);
            setRecipe(res.data.data); // újratöltjük a friss adatokat
            setNewComment('');
        } catch (err) {
            console.error("Hiba komment küldésnél:", err);
        }
    };
    const handleCommentLike = async (commentId) => {
        if (!user) {
            router.push('/login');
            return;
        }

        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post(`/api/comments/${commentId}/like`);

            const res = await axios.get(`/api/recipes/${id}`);
            setRecipe(res.data.data);
        } catch (err) {
            console.error("Komment like hiba:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            setRecipe(prev => ({
                ...prev,
                comments: prev.comments.filter(c => c.comment_id !== commentId)
            }));
        } catch (error) {
            console.error("Komment törlés hiba:", error.message);
        }
    };


    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!recipe) return <p className="text-center">Betöltés...</p>;
    //console.log("Kép:", recipe.image_url);
    return (
        <section className="px-6 md:px-12 py-12 min-h-screen">
            <div className="max-w-5xl mx-auto bg-radial-[at_75%_50%] from-brownUltra to-brownlight/80 rounded-xl shadow-md overflow-hidden md:flex">
                {/* Bal oldalon a kép */}
                <div className="md:flex-shrink-0">
                    <img
                        src={recipe.image_url }
                        alt={recipe.recipe_name}
                        className="w-full md:w-96 h-64 md:h-full object-cover"
                    />
                </div>

                {/* Jobb oldalon a szöveg */}
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.recipe_name}</h1>
                    {user && (
                        <button
                            onClick={handleLike}
                            className="bg-pink-500 transition hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            ❤️({recipe.likes_count})
                        </button>
                    )}
                    <p className="text-white mb-2"><span className="font-semibold">Konyha típusa:</span> {recipe.cuisine}</p>
                    <p className="text-white mb-2"><span className="font-semibold">Előkészítés:</span> {recipe.prep_time}</p>
                    <p className="text-white mb-2"><span className="font-semibold">Főzési idő:</span> {recipe.cook_time}</p>
                    {/*<p className="text-gray-600 mb-4"><span className="font-semibold">Likeok száma:</span> {recipe.likes_count}</p>*/}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Leírás</h2>
                        <p className="text-white leading-relaxed">{recipe.recipe_description}</p>
                    </div>
                    {/*TAGEK*/}
                    {recipe.tags && recipe.tags.length > 0 && (
                        <div className="my-6">
                            <h4 className="text-lg font-semibold mb-2">Címkék:</h4>
                            <div className="flex flex-wrap gap-2">
                                {recipe.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-yellow-200 text-black text-sm font-medium px-3 py-1 rounded-full shadow"
                                    >
                    {tag.tag_name}
                </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Hozzávalók */}
            <div className="max-w-5xl mx-auto mt-8 bg-radial-[at_25%_50%] from-brownUltra to-brownlight/80 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Hozzávalók</h2>
                {recipe.quantities && recipe.quantities.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 text-white">
                        {recipe.quantities.map((quantity, index) => (
                            <li key={index}>
                                {quantity.quantity} {quantity.measurement} {quantity.ingredient}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Nincsenek hozzávalók ehhez a recepthez.</p>
                )}
            </div>
            <div className="max-w-5xl mx-auto mt-8 bg-radial-[at_25%_50%] from-brownUltra to-brownlight/80 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Lépések</h2>

                {recipe.steps && recipe.steps.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-white leading-relaxed">
                        {recipe.steps.map((step) => (
                            <li key={step.step_id}>
                                {step.step_description}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-white">Ehhez a recepthez még nem tartoznak lépések.</p>
                )}
            </div>



            {user && (
                <div className="mt-6 p-4 bg-radial-[at_25%_50%] from-brownUltra to-brownlight/80 rounded shadow">
                    <h4 className="text-lg font-semibold mb-2">Szólj hozzá</h4>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded"
                        placeholder="Írd meg a véleményed..."
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="mt-2 px-4 py-2 bg-brownCoffee text-white rounded transition hover:bg-brownlight hover:text-black"
                    >
                        Beküldés
                    </button>
                </div>
            )}
            {/* Kommentek listázása */}
            <div className="mt-12 bg-radial-[at_25%_50%] from-brownUltra to-brownlight/80 p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-4">Hozzászólások</h3>
                {recipe.comments?.length > 0 ? (
                    recipe.comments.map((comment) => (
                        <div key={comment.comment_id} className="mb-4 border-b pb-2">
                            <p className="text-white"><strong>{comment.user?.username || 'Ismeretlen'}:</strong> {comment.comment_text}</p>
                            <p className="text-sm text-white">{new Date(comment.comment_date).toLocaleString()}</p>
                            {/* Like rész */}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => handleCommentLike(comment.comment_id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    ️  ❤️ Like
                                </button>
                                <span className="text-gray-600 text-sm">
                                    {comment.likes_count} kedvelés
                                </span>
                                {user && user.id === comment.user?.id && (
                                    <button
                                        onClick={() => handleDeleteComment(comment.comment_id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Komment törlése"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Még nincs hozzászólás ehhez a recepthez.</p>
                )}
            </div>

        </section>

    );
}