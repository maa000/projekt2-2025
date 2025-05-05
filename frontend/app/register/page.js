'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import '@/app/globals.css';


export default function RegisterPage() {
    const router = useRouter()
    const { register } = useAuth()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [errors, setErrors] = useState([])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const newErrors = []
        if (!form.email.includes('@')) newErrors.push('Az email cím nem érvényes.')
        if (form.password.length < 8) newErrors.push('A jelszónak legalább 8 karakteresnek kell lennie.')
        if (form.password !== form.password_confirmation) newErrors.push('A jelszavak nem egyeznek.')

        if (newErrors.length > 0) {
            setErrors(newErrors)
            return
        }

        await register({
            username: form.username,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
            setErrors,
        })

        router.push('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-brownCoffee bg-opacity-100">
            <form onSubmit={handleSubmit} className="bg-brownMiddle rounded shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold">Regisztráció</h2>
                <input name="username" type="text" placeholder="Felhasználónév" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Jelszó" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input name="password_confirmation" type="password" placeholder="Jelszó megerősítése" className="w-full p-2 border rounded" onChange={handleChange} required />
                {errors.length > 0 && <div className="text-red-500 text-sm">{errors.join(', ')}</div>}
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Regisztráció</button>
            </form>
        </div>
    )
}
