"use client";

import { useEffect, useState } from "react";

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Nem sikerült betölteni a felhasználót");
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
