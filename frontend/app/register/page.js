'use client';
import { useState } from 'react';

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const contentType = res.headers.get('content-type');

            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error('Nem JSON válasz:', text);
                alert('Nem JSON válasz érkezett, ellenőrizd az API URL-t!');
                return;
            }

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.access_token);
                alert('Sikeres regisztráció!');
            } else {
                alert('Hiba: ' + JSON.stringify(data.errors || data.message));
            }
        } catch (err) {
            console.error('Regisztrációs hiba:', err);
            alert('Hiba a regisztráció során!');
        }
    };

    return (
        <div className="bg-rose-400 min-h-screen flex items-center justify-center text-black p-4">
            <div className="bg-gray-900 p-8 rounded-3xl max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Regisztráció</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input name="username" placeholder="Felhasználónév" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Jelszó" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <input name="password_confirmation" type="password" placeholder="Jelszó megerősítése" className="bg-white text-black w-full p-3 rounded" onChange={handleChange} required />
                    <button type="submit" className="bg-white text-black font-semibold w-full py-3 rounded-xl shadow hover:bg-gray-200 mt-4">Regisztrálás</button>
                </form>
            </div>
        </div>
    );
}
