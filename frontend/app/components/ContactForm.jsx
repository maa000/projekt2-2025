import { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert("Üzenet elküldve!");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-pink-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">Kapcsolat Felvétel</h3>
            <div className="flex gap-2">
                <input
                    name="lastName"
                    placeholder="Vezetéknév"
                    onChange={handleChange}
                    className="w-1/2 p-2 rounded bg-white text-black"
                />
                <input
                    name="firstName"
                    placeholder="Keresztnév"
                    onChange={handleChange}
                    className="w-1/2 p-2 rounded bg-white text-black"
                />
            </div>
            <input
                name="email"
                placeholder="Email Cím"
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
            />
            <textarea
                name="message"
                placeholder="Üzenet"
                onChange={handleChange}
                className="w-full p-3 h-32 rounded bg-white text-black"
            />
            <button
                type="submit"
                className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700"
            >
                Küldés
            </button>
        </form>
    );
}
