"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Search from "./components/Search";
import RecipeSection from "./components/RecipeSection";
import Footer from "./components/Footer";
import SubmitForm from "./components/SubmitForm";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TeamPage from "./components/TeamPage";
import ProfilePage from "@/app/components/ProfilePage";


export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState("home"); // 👈 kezdetben főoldal

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
            .then((res) => res.json())
            .then((data) => setRecipes(data.data))
            .catch((err) => console.error("Fetch error:", err.message));
    }, []);

    const featured = recipes.slice(0, 3);
    const topRated = recipes.slice(3, 5);

    return (
        <div className="bg-rose-300 min-h-screen text-white">
            <Header onNavigate={setCurrentPage} />

            {currentPage === "home" && (
                <>
                    <Hero />
                    <Search />
                    <RecipeSection
                        title="Felkapott receptek"
                        recipes={featured}
                        bgColor="bg-rose-400"
                        rounded="rounded-t-3xl"
                    />
                    <RecipeSection
                        title="Legjobbak"
                        recipes={topRated}
                        bgColor="bg-rose-500"
                        rounded="rounded-b-3xl"
                    />
                </>
            )}

            {currentPage === "submit" && <SubmitForm/>}

            {currentPage === "register" && <RegisterForm />}

            {currentPage === "login" && <LoginForm />}

            {currentPage === "profile" && <ProfilePage/>}

            {currentPage === "team" && <TeamPage/>}

            <Footer />
        </div>
    );
}