'use client'

import { useState } from 'react'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function EmailChangePage() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            await api.get('/sanctum/csrf-cookie') // ← EZ A LÉNYEG!

            await api.put('/api/user/email', {
               email
            })

            setSuccess('E-mail sikeresen módosítva!')
            setTimeout(() => router.push('/profil'), 1500)
        } catch (err) {
            setError('Hiba történt: ' + (err.response?.data?.message || 'Ismeretlen hiba'))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Email módosítása</h2>
                <input
                    type="email"
                    placeholder="Új email cím"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
