'use client';

import { AddPizzaModal } from '@/src/modals/AddPizzaModal';
import { IPizza } from '@/src/types';
import { useState } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Table } from '../components/Table';
import { Title } from '../components/Title';

type Props = {
    pizzas: IPizza[];
};

export const MenuSection = ({ pizzas }: Props) => {
    const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);

    const styles = [
        'flex-1',
        'w-20 justify-center items-center flex sm:hidden',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center flex',
    ];

    const head = ['pizza name, ingredients', 'price', 'small', 'medium', 'large', 'buy'];

    const rows = pizzas.map((pizza) => [
        <>
            <span className="text-black font-bold text-sm">{pizza.name}</span>
            <br />
            {pizza.ingredients}
        </>,
        pizza.prices.small,
        pizza.prices.small,
        pizza.prices.medium,
        pizza.prices.large,
        <RiShoppingCart2Line
            key={pizza.id}
            className="text-textGray text-2xl cursor-pointer"
            onClick={() => setSelectedPizza(pizza)}
            data-testid="add-pizza-button"
        />,
    ]);

    return (
        <div className="my-16" id="menu">
            {selectedPizza && <AddPizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />}
            <Title title="Menu" description="Check our pizza menu." />
            <div className="mt-4">
                <Table items={[head, ...rows]} styles={styles} />
            </div>
        </div>
    );
};
