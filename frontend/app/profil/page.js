'use client'

import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import api from '@/lib/axios'
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation'
import '@/app/globals.css';

export default function ProfilPage() {
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    })
    const [recipes, setRecipes] = useState([])
    const [likedRecipes, setLikedRecipes] = useState([]);
    const router = useRouter()

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
            })
        }
    }, [user])

    useEffect(() => {
        if (!user) return;

        api.get('api/user/recipes')
            .then(res => {
                setRecipes(res.data.data) // Itt volt a hiba
            })
            .catch(err => {
                console.error('Hiba a receptek lekérésekor:', err)
            });

        api.get('api/user/liked-recipes') // <-- Itt az API endpoint
            .then(res => {
                setLikedRecipes(res.data.data) // FONTOS: .data.data
            })
            .catch(err => {
                console.error('Hiba a kedvelt receptek lekérésekor:', err);
            });
    }, [user])

    const handleDeleteAccount = async () => {
        if (!confirm("Biztosan törölni szeretnéd a profilodat? Ez nem visszavonható!")) return;

        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.delete('/api/user/delete');

            localStorage.removeItem('authToken');
            router.push('/login');
        } catch (error) {
            console.error("Profil törlés hiba:", error);
            alert("Hiba történt a törlés során.");
        }
    };

    return (
        <div className="min-h-screen bg-brownCoffee p-8 flex justify-center">
            <div className="bg-brownMiddle text-white p-6 rounded w-96 flex flex-col items-center space-y-4">
                <div className="bg-gray-200 rounded-full h-28 w-28 flex items-center justify-center text-black text-3xl font-bold">👤</div>
                <div className="bg-white text-black py-2 px-4 rounded w-full text-center font-semibold">{formData.username}</div>
                <div className="bg-white text-black py-2 px-4 rounded w-full text-center">{formData.email}</div>
                <div className="flex space-x-4 mt-4">
                    <button
                        className="bg-brownCoffee text-white px-4 py-2 rounded"
                        onClick={() => router.push('/emailreset')}
                    >
                        Email módosítás
                    </button>
                    <button
                        className="bg-brownCoffee text-white px-4 py-2 rounded"
                        onClick={() => router.push('/passwordreset')}
                    >
                        Jelszó módosítás
                    </button>
                </div>
            </div>

            <div className="ml-12 space-y-8">
                <div className="bg-brownMiddle text-white p-4 rounded w-72 shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Receptjeim</h3>
                    <ul className="space-y-2">
                        {recipes.length ? recipes.map(recipe => (
                            <li
                                key={recipe.id}
                                onClick={() => router.push(`/recipes/${recipe.id}`)}
                                className="cursor-pointer hover:underline"
                            >
                                {recipe.title}
                            </li>
                        )) : (
                            <p className="text-sm text-gray-400">Nincs feltöltött recept</p>
                        )}
                    </ul>
                </div>
                <div className="bg-brownMiddle text-white p-4 rounded w-72 shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Kedvelt Receptek</h3>
                    <ul className="space-y-2">
                        {likedRecipes.length ? likedRecipes.map(recipe => (
                            <li
                                key={recipe.id}
                                onClick={() => router.push(`/recipes/${recipe.id}`)}
                                className="cursor-pointer hover:underline"
                            >
                                {recipe.title}
                            </li>
                        )) : (
                            <p className="text-sm text-gray-400">Nincs kedvelt recept</p>
                        )}
                    </ul>
                </div>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-brownlight text-white w-full py-2 rounded mt-4"
                >
                    Profil Törlése
                </button>
            </div>
        </div>
    )
}
