'use client'

import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function ProfilPage() {
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    })
    const [recipes, setRecipes] = useState([])
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
    }, [user])

    return (
        <div className="min-h-screen bg-rose-400 p-8 flex justify-center">
            <div className="bg-gray-900 text-white p-6 rounded w-96 flex flex-col items-center space-y-4">
                <div className="bg-gray-200 rounded-full h-28 w-28 flex items-center justify-center text-black text-3xl font-bold">👤</div>
                <div className="bg-white text-black py-2 px-4 rounded w-full text-center font-semibold">{formData.username}</div>
                <div className="bg-white text-black py-2 px-4 rounded w-full text-center">{formData.email}</div>
                <div className="flex space-x-4 mt-4">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded">Share</button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded">Edit</button>
                </div>
            </div>

            <div className="ml-12 space-y-8">
                <div className="bg-gray-900 text-white p-4 rounded w-72 shadow-lg">
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
                <div className="bg-gray-900 text-white p-4 rounded w-72 shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Mentett Receptek</h3>
                    <p className="text-sm text-gray-400">----------------------------</p>
                </div>
                <button className="bg-red-700 text-white w-full py-2 rounded mt-4">Profil Törlése</button>
            </div>
        </div>
    )
}
