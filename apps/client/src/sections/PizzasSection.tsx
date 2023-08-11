'use client';

import { Button } from '@/src/components/Button';
import { Title } from '@/src/components/Title';
import { deletePizza, getPizzas } from '@/src/lib/api';
import { CreatePizzaModal } from '@/src/modals/CreatePizzaModal';
import { EditPizzaModal } from '@/src/modals/EditPizzaModal';
import { IPizza } from '@/src/types';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Table } from '../components/Table';
import { Toast } from '../components/Toast';

type Props = {
    passPizzas: IPizza[];
};

export const PizzasSection = ({ passPizzas }: Props) => {
    const [pizzas, setPizzas] = useState<IPizza[]>(passPizzas);
    const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
    const [isCreatePizzaModalShown, setIsCreatePizzaModalShown] = useState(false);

    const fetchPizzas = async () => {
        const response = await getPizzas();

        if (response.status === 'success') {
            setPizzas(response.data.pizzas);
        }
    };

    useEffect(() => {
        if (isCreatePizzaModalShown === false || selectedPizza === null) {
            fetchPizzas();
        }
    }, [isCreatePizzaModalShown, selectedPizza]);

    const deletePizzaButtonClick = async (id: number) => {
        const response = await deletePizza(id);
        toast(<Toast text={response.message} />);

        fetchPizzas();
    };

    const styles = [
        'flex-1',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center flex',
    ];

    const head = ['pizza name, ingredients', 'small', 'medium', 'large', 'actions'];

    const rows = pizzas.map((pizza) => [
        <>
            <span className="text-black font-bold text-sm">{pizza.name}</span>
            <br />
            {pizza.ingredients}
        </>,
        pizza.prices.small,
        pizza.prices.medium,
        pizza.prices.large,
        <>
            <RiPencilLine
                className="text-textGray text-2xl cursor-pointer"
                onClick={() => setSelectedPizza(pizza)}
                data-testid="edit-pizza-button"
            />
            <RiDeleteBinLine
                className="text-textGray text-2xl cursor-pointer"
                onClick={() => deletePizzaButtonClick(pizza.id)}
                data-testid="delete-pizza-button"
            />
        </>,
    ]);

    return (
        <div className="mt-4">
            {isCreatePizzaModalShown && <CreatePizzaModal onClose={() => setIsCreatePizzaModalShown(false)} />}
            {selectedPizza && <EditPizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />}
            <div className=" bg-white py-4 px-2 w-full rounded">
                <Title title="Pizzas" description="Manage pizzas" />
                <div className="mt-4">
                    <Button variant="primary" onClick={() => setIsCreatePizzaModalShown(true)}>
                        Create pizza
                    </Button>
                </div>
                <div className="mt-4">
                    <Table head={head} rows={rows} styles={styles} />
                </div>
            </div>
        </div>
    );
};
