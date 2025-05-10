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
            setSuccess: msg => {
                if (msg === 'Your password has been reset.') {
                    setSuccess('A jelszavad sikeresen frissítve lett.')
                } else {
                    setSuccess(msg)
                }
            },
            setError: rawErrors => {
                const allErrors = Object.values(rawErrors).flat()
                const translated = allErrors.map(msg => {
                    if (msg === 'This password reset token is invalid.') {
                        return 'A jelszó-visszaállító token érvénytelen.'
                    }
                    return msg
                })
                setError(translated.join(' '))
            },
        })

        if (!error) {
            setTimeout(() => router.push('/login'), 3000)
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
                    <h2 className="text-lg font-bold text-center">Új jelszó beállítása</h2>

                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                    />

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

                    {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-brownCoffee text-white py-2 rounded transition hover:bg-brownlight hover:text-black"
                    >
                        Jelszó visszaállítása
                    </button>
                </form>
            </div>
        </div>
    )
}