'use client';
import React, { useState } from 'react';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. CSRF cookie
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
                credentials: 'include',
            });

            // 2. Register
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert('Sikeres regisztráció!');
            } else {
                const data = await response.json();
                alert('Hiba: ' + JSON.stringify(data.errors));
            }
        } catch (err) {
            alert('Hiba a regisztráció során!');
            console.error(err);
        }
    };

    return (
        <div className="bg-rose-400 min-h-screen flex items-center justify-center text-black p-4">
            <div className="bg-gray-900 p-8 rounded-3xl max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Regisztráció</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Felhasználónév" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Jelszó" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input type="password" name="password_confirmation" placeholder="Jelszó megerősítése" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />

                    <button type="submit" className="bg-white text-black font-semibold w-full py-3 rounded-xl shadow hover:bg-gray-200 mt-4">Regisztrálás</button>
                </form>
            </div>
        </div>
    );
}
