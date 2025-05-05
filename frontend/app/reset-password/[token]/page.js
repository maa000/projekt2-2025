'use client'

import { use } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage({ params }) {
    const { token } = use(params)
    const searchParams = useSearchParams()
    const email = searchParams.get('email') || ''

    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const handleSubmit = async e => {
        e.preventDefault()
        setSuccess('')
        setError('')

        await resetPassword({
            email,
            token,
            password,
            password_confirmation,
            setError,
            setSuccess,
        })

        if (!Object.keys(error).length) {
            setTimeout(() => router.push('/login'), 2000)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Új jelszó beállítása</h2>

                <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-2 border rounded mb-3 bg-gray-100 text-gray-700"
                />

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
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
                    Jelszó visszaállítása
                </button>

                {success && <p className="text-green-600 mt-3">{success}</p>}
                {error && <p className="text-red-600 mt-3">{error}</p>}
            </form>
        </div>
    )
}
