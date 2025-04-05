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
import RecipeDetail from "./components/RecipeDetail";
import RecipeBrowserPage from "./components/RecipeBrowserPage";
import TermsOfUse from "./components/TermsOfUse";




export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState("home"); // 👈 kezdetben főoldal
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
            .then((res) => res.json())
            .then((data) => setRecipes(data.data))
            .catch((err) => console.error("Fetch error:", err.message));
    }, []);

    const featured = recipes.slice(0, 3);
    const topRated = recipes.length >= 6
        ? recipes.slice(3, 6)
        : [
            { title: "Gulyásleves", image: "https://via.placeholder.com/300x200", rating: 5 },
            { title: "Töltött paprika", image: "https://via.placeholder.com/300x200", rating: 4 },
            { title: "Lecsó kolbásszal", image: "https://via.placeholder.com/300x200", rating: 3 },
        ];
    console.log("top rated", topRated)
    return (
        <div className="bg-rose-300 min-h-screen text-white">
            <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded shadow-md z-50"
            >
                {isLoggedIn ? "Kijelentkezés" : "Bejelentkezés"}
            </button>

            <Header onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />


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

            {currentPage === "register" && <RegisterForm onNavigate={setCurrentPage} />}

            {currentPage === "terms" && <TermsOfUse />}

            {currentPage === "login" && <LoginForm />}

            {currentPage === "profile" && <ProfilePage/>}

            {currentPage === "team" && <TeamPage/>}

            {currentPage === "recipes" && !selectedRecipe && (
                <RecipeBrowserPage onSelect={() => setCurrentPage("recipeDetail")} />
            )}

            {currentPage === "recipeDetail" && <RecipeDetail />}

            <Footer />
        </div>
    );
}