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
        <header className="bg-gray-900 text-white p-8 flex justify-between">
            <div className="text-xl font-bold">
                <Link href="/">Tastyfiee</Link>
            </div>
            <nav className="space-x-4">
                <Link href="/">Kezdőlap</Link>
                <Link href="/recipes">Receptek</Link>

                {isClient && user ? (
                    <>
                        <Link href="/recept-bekuldese">Recept beküldése</Link>
                        <Link href="/profil">Profil</Link>
                        <button onClick={logout} className="text-red-400 ml-2">
                            Kilépés
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Belépés</Link>
                        <Link href="/register">Regisztráció</Link>
                    </>
                )}
            </nav>
        </header>
    )
}
