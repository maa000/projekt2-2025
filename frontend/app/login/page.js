'use client'

import Link from 'next/link'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import '@/app/globals.css'

export default function LoginPage() {
    const { login } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const validationErrors = {}

        if (!form.email.includes('@')) {
            validationErrors.email = ['Érvénytelen email cím.']
        }

        if (form.password.length < 8) {
            validationErrors.password = ['Érvénytelen jelszó.']
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        await login({
            email: form.email,
            password: form.password,
            setErrors,
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
                    <h2 className="text-lg font-bold text-center">Belépés</h2>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Jelszó"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />

                    {Object.values(errors).flat().length > 0 && (
                        <div className="text-red-500 text-sm text-center">
                            {Object.values(errors).flat().map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-brownCoffee text-white py-2 rounded transition hover:bg-brownlight hover:text-black"
                    >
                        Belépés
                    </button>

                    <p className="text-sm text-right w-full">
                        <Link href="/forgot-password" className="text-blue-500 hover:underline">
                            Elfelejtetted a jelszavad?
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
