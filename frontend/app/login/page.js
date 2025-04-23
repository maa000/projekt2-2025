'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'


export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState([])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        await login({
            email: form.email,
            password: form.password,
            setErrors,
        })

        router.push('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold">Belépés</h2>
                <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Jelszó" className="w-full p-2 border rounded" onChange={handleChange} required />
                {errors.length > 0 && <div className="text-red-500 text-sm">{errors.join(', ')}</div>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Belépés</button>
            </form>
        </div>
    )
}
