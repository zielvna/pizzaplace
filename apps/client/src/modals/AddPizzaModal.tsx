'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Counter } from '../components/Counter';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { useStore } from '../store';
import { IPizza } from '../types';

type Props = {
    pizza: IPizza;
    onClose?: () => void;
};

export const AddPizzaModal = ({ pizza, onClose }: Props) => {
    const [size, setSize] = useState('small');
    const [dough, setDough] = useState('thin');
    const [amount, setAmount] = useState(1);
    const { addToCart } = useStore();

    const getPrice = () => {
        switch (size) {
            case 'small':
                return pizza.prices.small;
            case 'medium':
                return pizza.prices.medium;
            case 'large':
                return pizza.prices.large;
            default:
                return 0;
        }
    };

    const onClick = () => {
        const { id, name, ingredients } = pizza;
        addToCart({ id, name, ingredients, size, dough, amount, price: getPrice() });

        if (onClose) {
            onClose();
        }

        toast(<Toast text="Pizza successfully added to cart" />);
    };

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Add pizza to cart" description="Choose pizza size, dough and amount." />
            <div className="mt-4">
                <div className="bg-backgroundGray p-2">
                    <p className="text-black font-bold text-sm">{pizza.name}</p>
                    <p className="text-textGray">{pizza.ingredients}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-textGray">Size:</p>
                <div className="mt-2">
                    <Select items={['small', 'medium', 'large']} selected="small" onChange={(item) => setSize(item)} />
                </div>
            </div>
            <div className="mt-4">
                <p className="text-textGray">Dough:</p>
                <div className="mt-2">
                    <Select items={['thin', 'thick']} selected="thin" onChange={(item) => setDough(item)} />
                </div>
            </div>
            <div className="mt-4">
                <p className="text-textGray">Amount:</p>
                <div className="mt-2">
                    <Counter scheme="gray" onChange={(count) => setAmount(count)} value={amount} min={1} max={5} />
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <Button variant="white" type="button" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClick}>
                        Add to cart ({getPrice() * amount} pln)
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
