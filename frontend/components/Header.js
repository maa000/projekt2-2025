"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-zinc-900 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Tastyfiee</h1>
            <nav className="mt-4 md:mt-0 flex flex-wrap gap-4 items-center">
                <Link href="/" className="hover:underline">Otthon</Link>
                <Link href="/recipes" className="hover:underline">Receptek</Link>
                <Link href="/submit" className="hover:underline">Recept beküldése</Link>
                <Link href="/profile" className="hover:underline">Profil</Link>
                <Link href="/team" className="hover:underline">Team</Link>
            </nav>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
                <Link href="/login" className="hover:underline font-semibold">Bejelentkezés</Link>
                <Link href="/register" className="hover:underline">Regisztráció</Link>
            </div>
        </header>
    );
}
