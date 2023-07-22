import { fetchSetup, fetchUser } from '@/src/lib/fetch';
import { LoginModal } from '@/src/modals/LoginModal';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Login() {
    const isSetup = await fetchSetup();
    const user = await fetchUser();

    if (!isSetup) {
        redirect('/dashboard/register');
    }

    if (user?.role === 'user') {
        redirect('/');
    }

    if (user?.role === 'admin') {
        redirect('/dashboard');
    }

    return <LoginModal isDashboard={true} />;
}
