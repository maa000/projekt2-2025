'use client'

import Link from 'next/link'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import '@/app/globals.css'

export default function RegisterPage() {
    const { register } = useAuth()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
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
            validationErrors.password = ['A jelszónak legalább 8 karakter hosszúnak kell lennie.']
        }

        if (form.password !== form.password_confirmation) {
            validationErrors.password_confirmation = ['A jelszavak nem egyeznek.']
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        await register({
            username: form.username,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
            setErrors: rawErrors => {
                const translated = {}

                for (const [field, messages] of Object.entries(rawErrors)) {
                    translated[field] = messages.map(message => {
                        if (message === 'The username has already been taken.') {
                            return 'Ez a felhasználónév már foglalt.'
                        }
                        if (message === 'The email has already been taken.') {
                            return 'Ez az email cím már foglalt.'
                        }
                        return message // fallback: eredeti angol szöveg
                    })
                }

                setErrors(translated)
            }
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
                    className="absolute top-[20%] left-[35%] w-[50%] z-10 flex flex-col gap-4 backdrop-blur-sm p-4 rounded shadow-lg"
                >
                    <h2 className="text-lg font-bold text-center">Regisztráció</h2>

                    <input
                        name="username"
                        type="text"
                        placeholder="Felhasználónév"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />

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

                    <input
                        name="password_confirmation"
                        type="password"
                        placeholder="Jelszó megerősítése"
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
                        className="w-full bg-green-600 text-white py-2 rounded transition hover:bg-green-700"
                    >
                        Regisztráció
                    </button>

                    <p className="text-sm text-right w-full">
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Már van fiókod? Jelentkezz be!
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
