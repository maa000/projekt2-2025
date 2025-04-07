export default function TermsPage() {
    return (
        <div className="bg-purple-100 min-h-screen py-16 px-6 flex items-center justify-center">
            <div className="bg-white text-black max-w-4xl w-full p-10 rounded-xl shadow-md border border-gray-300">
                <h1 className="text-4xl font-bold text-center mb-6">Felhasználási Feltételek</h1>
                <p className="text-justify leading-relaxed text-lg">
                    A Tastyfiee weboldal használatával Ön elfogadja az alábbi feltételeket. A weboldal célja receptek megosztása, felfedezése, és gasztronómiai közösség építése. Felhasználóként Ön vállalja, hogy valós adatokat ad meg a regisztráció során, nem tölt fel jogvédett vagy sértő tartalmat, és tiszteletben tartja a közösségi normákat.
                    <br /><br />
                    A Tastyfiee nem vállal felelősséget a felhasználók által beküldött receptek hitelességéért, de mindent megteszünk annak érdekében, hogy a felület biztonságos és kellemes maradjon mindenki számára. Fenntartjuk a jogot a tartalmak moderálására, törlésére és a felhasználók fiókjának felfüggesztésére szabálysértés esetén.
                    <br /><br />
                    A feltételek változhatnak, ezért javasoljuk, hogy időről időre látogassa meg ezt az oldalt. Amennyiben nem ért egyet az aktuális szabályokkal, kérjük, ne használja tovább a szolgáltatást.
                    <br /><br />
                    Köszönjük, hogy a Tastyfiee-t választotta – jó főzést és kellemes időtöltést kívánunk!
                </p>
            </div>
        </div>
    );
}
