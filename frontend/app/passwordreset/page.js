'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'

export default function PasswordChangePage() {
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [current_password, setCurrentPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            await api.get('/sanctum/csrf-cookie')
            await api.put('/api/user/password', {
                password,
                password_confirmation,
                current_password,
            })
            setSuccess('Jelszó sikeresen módosítva!')
            setTimeout(() => router.push('/profil'), 1500)
        } catch (err) {
            setError('Hiba történt: ' + (err.response?.data?.message || 'Ismeretlen hiba'))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <div className="relative w-[1000px] max-w-full aspect-[3/2]">
                <img
                    src="/images/board.png"
                    alt="board"
                    className="absolute inset-0 w-full h-full object-contain z-0"
                />

                <form
                    onSubmit={handleSubmit}
                    className="absolute top-[30%] left-[35%] w-[50%] z-10 flex flex-col gap-4 backdrop-blur-sm p-4 rounded shadow-lg"
                >
                    <h2 className="text-lg font-bold text-center">Jelszó módosítása</h2>

                    <input
                        type="password"
                        placeholder="Új jelszó"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Jelszó megerősítése"
                        value={password_confirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Jelenlegi jelszó"
                        value={current_password}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    {success && <p className="text-green-600 text-center">{success}</p>}
                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-brownCoffee text-white py-2 rounded transition hover:bg-brownlight hover:text-black"
                    >
                        Mentés
                    </button>
                </form>
            </div>
        </div>
    )
}
