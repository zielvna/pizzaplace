import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { User } from '../components/User';
import { Wrapper } from '../components/Wrapper';
import { fetchPizzas, fetchSetup } from '../lib/functions';
import { AboutUsSection } from '../sections/AboutUsSection';
import { HeroSection } from '../sections/HeroSection';
import { MenuSection } from '../sections/MenuSection';
import { ProcessSection } from '../sections/ProcessSection';

export const metadata: Metadata = {
    title: 'PizzaPlace - Home',
};

export default async function Home() {
    const pizzas = await fetchPizzas();
    const isSetup = await fetchSetup();

    if (!isSetup) {
        redirect('/dashboard/register');
    }

    return (
        <User>
            <Wrapper scheme="primary">
                <Header isDashboard={false} />
                <HeroSection />
            </Wrapper>
            <Wrapper scheme="white">
                <ProcessSection />
                <MenuSection pizzas={pizzas} />
                <AboutUsSection />
            </Wrapper>
            <Wrapper scheme="primary">
                <Footer />
            </Wrapper>
        </User>
    );
}
