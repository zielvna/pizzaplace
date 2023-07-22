import { Header } from '@/src/components/Header';
import { User } from '@/src/components/User';
import { Wrapper } from '@/src/components/Wrapper';
import { fetchPizzas, fetchSetup, fetchUser } from '@/src/lib/fetch';
import { PizzasSection } from '@/src/sections/PizzasSection';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Dashboard() {
    const pizzas = await fetchPizzas();
    const isSetup = await fetchSetup();
    const user = await fetchUser();

    if (!isSetup) {
        redirect('/dashboard/register');
    }

    if (!user || user?.role === 'user') {
        redirect('/');
    }

    return (
        <User>
            <Wrapper scheme="black">
                <Header isDashboard={true} />
            </Wrapper>
            <Wrapper scheme="gray">
                <div className="h-[calc(100vh-80px)]">
                    <PizzasSection passPizzas={pizzas} />
                </div>
            </Wrapper>
        </User>
    );
}
