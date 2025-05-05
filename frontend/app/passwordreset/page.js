'use client'

import { useState } from 'react'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'

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
            await api.get('/sanctum/csrf-cookie') // ← EZ A LÉNYEG!

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
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Jelszó módosítása</h2>
                <input
                    type="password"
                    placeholder="Új jelszó"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Jelszó megerősítése"
                    value={password_confirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Jelenlegi jelszó"
                    value={current_password}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">Mentés</button>
                {success && <p className="text-green-600 mt-2">{success}</p>}
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
        </div>
    )
}
