'use client'

import { useState } from 'react'
import useAuth from '@/hooks/useAuth'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [errors, setErrors] = useState([])

    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const handleSubmit = async e => {
        e.preventDefault()
        await forgotPassword({ email, setStatus, setErrors })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Elfelejtett jelszó</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">Helyreállító e-mail küldése</button>
                {status && <p className="text-green-600 mt-2">{status}</p>}
                {errors.email && <p className="text-red-600 mt-2">{errors.email[0]}</p>}
            </form>
        </div>
    )
}
