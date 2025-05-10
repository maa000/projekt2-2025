import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingIndicator from '../components/LoadingIndicator';

export default function RootLayout({ children }) {
    return (
        <html lang="hu">
        <body className="bg-[url(@/public/images/food.png)] bg-repeat bg-brownUltra">
        <LoadingIndicator />
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    );
}
