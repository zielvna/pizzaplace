import { Header } from '@/src/components//Header';
import { User } from '@/src/components/User';
import { Wrapper } from '@/src/components/Wrapper';
import { fetchOrders, fetchSetup, fetchUser } from '@/src/lib/functions';
import { OrdersSection } from '@/src/sections/OrdersSection';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'PizzaPlace - Dashboard',
};

export default async function Orders() {
    const orders = await fetchOrders();
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
                    <OrdersSection passOrders={orders} />
                </div>
            </Wrapper>
        </User>
    );
}
