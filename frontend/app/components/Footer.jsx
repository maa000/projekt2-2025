export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 px-6 mt-10">
            <div className="flex justify-between flex-wrap">
                <div>
                    <h3 className="text-xl font-bold">Tastyfiee</h3>
                    <div className="flex gap-2 mt-2">
                        <a href="#">📷</a>
                        <a href="#">📘</a>
                        <a href="#">📺</a>
                        <a href="#">📸</a>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>Contact</p>
                    <p>Support</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
                <div className="space-y-1">
                    <p>Kategóriák</p>
                    <p>Felkapott receptek</p>
                    <p>Legjobbak</p>
                </div>
                <div className="space-y-1">
                    <p>Site Links</p>
                    <p>Team</p>
                    <p>Log in</p>
                </div>
            </div>
        </footer>
    );
}
