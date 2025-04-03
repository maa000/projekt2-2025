export default function Header({ onNavigate }) {
    return (
        <header className="bg-gray-900 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => onNavigate("home")}>
                Tastyfiee
            </h1>
            <nav className="flex gap-6">
                <button onClick={() => onNavigate("home")}>Otthon</button>
                <button onClick={() => onNavigate("submit")}>Recept beküldése</button>
                <button onClick={() => onNavigate("profile")}>Profil</button>
                <button onClick={() => onNavigate("team")}>Team</button>
                <button onClick={() => onNavigate("register")}>Regisztráció</button>
                <button onClick={() => onNavigate("login")}>Bejelentkezés</button>
            </nav>
        </header>
    );
}
