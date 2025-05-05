'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import '@/app/globals.css';


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
        <div className="min-h-screen  flex items-center justify-center bg-[url(@/public/images/board.png)] bg-no-repeat bg-[position:400%_center]">
            <form onSubmit={handleSubmit} className="bg-brownMiddle p-10 rounded shadow-md w-125 flex flex-col items-center space-y-4">
                <h2 className="text-xl font-bold">Belépés</h2>
                <input name="email" type="email" placeholder="Email" className="w-full p-2  border rounded" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Jelszó" className="w-full p-2 border rounded" onChange={handleChange} required />
                {errors.length > 0 && <div className="text-red-500 text-sm">{errors.join(', ')}</div>}
                <button type="submit" className="w-full bg-brownlight text-black py-2 rounded">Belépés</button>
                <p className="text-sm text-right mt-2">
                    <Link href="/forgot-password" className="text-blue-500 hover:underline">Elfelejtetted a jelszavad?</Link>
                </p>
            </form>
        </div>
    )
}
