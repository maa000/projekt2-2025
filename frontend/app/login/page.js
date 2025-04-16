'use client';

import { useState } from 'react';
import api from '../../lib/axios';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        await api.get('/sanctum/csrf-cookie');
        e.preventDefault();

        try {
            const response = await api.post('/login', form);
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            alert('Sikeres bejelentkezés!');
        } catch (error) {
            console.error(error);
            alert('Hibás adatok: ' + (error.response?.data?.message || 'Ismeretlen hiba'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold mb-4">Bejelentkezés</h2>
                <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Jelszó" className="w-full border p-2 rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">Belépés</button>
            </form>
        </div>
    );
}
