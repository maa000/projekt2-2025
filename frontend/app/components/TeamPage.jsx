import ContactForm from "./ContactForm";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamPage() {
    const team = [
        {
            name: "Váradi „Alfa” Zsolt",
            email: "email.exe",
            image: "/images/team/alfa.jpg",
        },
        {
            name: "Váli „Sigma” Máté",
            email: "email.exe",
            image: "/images/team/sigma.jpg",
        },
        {
            name: "Piroska „Magas” Bálint",
            email: "email.exe",
            image: "/images/team/magas.jpg",
        },
        {
            name: "Felgyői „Gooning” Levente",
            email: "email.exe",
            image: "/images/team/gooning.jpg",
        },
        {
            name: "Szabó „Gooner András” Martin",
            email: "email.exe",
            image: "/images/team/gooner.jpg",
        },
    ];

    return (
        <div className="bg-rose-400 text-black p-8 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Információ & Csapat</h1>

            {/* Középre igazított bemutatkozó doboz */}
            <div className="bg-pink-200 p-6 rounded-xl max-w-4xl mx-auto mb-10 text-center">
                <h2 className="text-2xl font-bold mb-2">Kupakalakulat Csapata</h2>
                <p className="text-lg leading-relaxed">
                    Mi egy professzionális cookinolo applikáció készítő alakulat vagyunk, akik a kulináris innováció élvonalában menetelnek – főzünk, kódolunk és GOONINGolunk!
                </p>
            </div>

            {/* Kétoszlopos szekció: balra kapcsolat, jobbra csapat */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Kapcsolatfelvételi űrlap */}
                <div className="lg:w-1/2">
                    <ContactForm />
                </div>

                <div className="lg:w-full flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="flex justify-center">
                                <TeamMemberCard {...member} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
