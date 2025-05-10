'use client'

import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import '@/app/globals.css'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [errors, setErrors] = useState({})

    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const handleSubmit = async e => {
        e.preventDefault()

        if (!email.includes('@')) {
            setErrors({ email: ['Érvénytelen email cím.'] })
            return
        }

        await forgotPassword({
            email,
            setErrors: rawErrors => {
                const translated = {}

                for (const [field, messages] of Object.entries(rawErrors)) {
                    translated[field] = messages.map(message => {
                        if (message === "We can't find a user with that email address.") {
                            return 'Nem található felhasználó ezzel az email címmel.'
                        }
                        return message
                    })
                }

                setErrors(translated)
            },
            setStatus: message => {
                if (message === 'We have emailed your password reset link.') {
                    setStatus('A jelszó-visszaállító linket elküldtük az email címedre.')
                } else {
                    setStatus(message)
                }
            },
        })
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
                    <h2 className="text-lg font-bold text-center">Elfelejtett jelszó</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    {errors.email && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.email.map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    )}

                    {status && (
                        <div className="text-green-500 text-sm text-center">
                            <p>{status}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-brownCoffee text-white py-2 rounded transition hover:bg-brownlight hover:text-black"
                    >
                        Helyreállító e-mail küldése
                    </button>
                </form>
            </div>
        </div>
    )
}
