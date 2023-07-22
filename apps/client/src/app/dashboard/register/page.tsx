import { fetchSetup } from '@/src/lib/functions';
import { RegisterModal } from '@/src/modals/RegisterModal';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'PizzaPlace - Dashboard',
};

export default async function Register() {
    const isSetup = await fetchSetup();

    if (isSetup) {
        redirect('/dashboard');
    }

    return <RegisterModal isDashboard={true} />;
}
