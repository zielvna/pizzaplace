import { fetchSetup } from '@/src/lib/fetch';
import { RegisterModal } from '@/src/modals/RegisterModal';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Register() {
    const isSetup = await fetchSetup();

    if (isSetup) {
        redirect('/dashboard');
    }

    return <RegisterModal isDashboard={true} />;
}
