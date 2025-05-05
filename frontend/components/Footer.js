"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 px-6 mt-10">
            <div className="flex justify-between flex-wrap">
                <div>
                    <h3 className="text-xl font-bold">Tastyfiee</h3>
                    <div className="flex gap-2 mt-2">
                        {/*<a href="#">📷</a>*/}
                        {/*<a href="#">📘</a>*/}
                        {/*<a href="#">📺</a>*/}
                        {/*<a href="#">📸</a>*/}
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-xl font-semibold">Contact</p>
                    {/*<p>Support</p>*/}
                    {/*<p>Privacy</p>*/}
                    <Link href="/team" className="hover:underline"><p>Team</p></Link>
                    <Link href="/terms" className="hover:underline"><p>Terms</p></Link>
                </div>
                {/*<div className="space-y-1">*/}
                {/*    <p>Kategóriák</p>*/}
                {/*    <p>Felkapott receptek</p>*/}
                {/*    <p>Legjobbak</p>*/}
                {/*</div>*/}
                <div className="space-y-1">
                    <p className="text-xl font-semibold">Site Links</p>
                    {/*<p>Team</p>*/}
                    {/*<p>Log in</p>*/}
                    <Link href="/login" className="hover:underline"><p>Log in</p></Link>
                    <Link href="/register" className="hover:underline"><p>Register</p></Link>
                </div>
            </div>
        </footer>
    );
}
