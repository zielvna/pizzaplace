import { Poppins } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export const poppins = Poppins({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className} suppressHydrationWarning={true}>
                {children}
                <ToastContainer
                    position="bottom-left"
                    hideProgressBar={true}
                    closeButton={false}
                    draggable={false}
                    transition={Slide}
                />
            </body>
        </html>
    );
}
