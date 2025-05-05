'use client'

import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

export default function Header() {
    const { user, logout } = useAuth()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <header className="bg-gray-900 text-white p-8 h-30 items-center flex justify-between">
            <div className="text-xl font-bold">
                <Link href="/" className="text-3xl">Tastyfiee</Link>
            </div>
            <nav className="space-x-4">
                <Link href="/" className="text-xl">Kezdőlap</Link>
                <Link href="/recipes" className="text-xl">Receptek</Link>

                {isClient && user ? (
                    <>
                        <Link href="/recept-bekuldese" className="text-xl">Recept beküldése</Link>
                        <Link href="/profil" className="text-xl">Profil</Link>
                        <button onClick={logout} className="text-red-400 text-xl ml-2">
                            Kilépés
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-xl">Belépés</Link>
                        <Link href="/register" className="text-xl">Regisztráció</Link>
                    </>
                )}
            </nav>
        </header>
    )
}
