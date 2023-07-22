import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export const poppins = Poppins({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: {
        default: 'PizzaPlace',
        template: 'PizzaPlace - %s',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body suppressHydrationWarning={true}>
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
