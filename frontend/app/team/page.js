'use client';

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
            image: "/images/team/szigma.jpg",
        },
        {
            name: "Piroska „Magas” Bálint",
            email: "email.exe",
            image: "/images/team/magas.png",
        },
        {
            name: "Felgyői „Gooning” Levente",
            email: "email.exe",
            image: "/images/team/felgya.jfif",
        },
        {
            name: "Szabó „Gooner András” Martin",
            email: "email.exe",
            image: "/images/team/gooning.jpg",
        },
    ];

    return (
        <section className="px-6 md:px-12 py-12 bg-violet-100 min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Fejléc */}
                <h1 className="text-4xl font-bold text-center mb-8">A Csapat</h1>

                {/* Bemutatkozás */}
                <div className="bg-white p-6 md:p-10 rounded-xl shadow mb-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Kupakalakulat</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Mi egy professzionális cookinolo applikáció készítő alakulat vagyunk, akik a kulináris innováció élvonalában menetelnek – főzünk, kódolunk és GOONINGolunk!
                    </p>
                </div>

                {/* Csapattag kártyák */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-violet-300 mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}