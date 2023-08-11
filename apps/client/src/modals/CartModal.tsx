import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '../components/Button';
import { Counter } from '../components/Counter';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { createOrder } from '../lib/api';
import { useStore } from '../store';

type Props = {
    onClose?: () => void;
};

export const CartModal = ({ onClose }: Props) => {
    const [error, setError] = useState('');
    const { pizzas, changeAmount, removeFromCart, clearCart } = useStore();

    const schema = z.object({
        name: z.string().min(1),
        phoneNumber: z.string().min(1),
        street: z.string().min(1),
        houseNumber: z.string().min(1),
        city: z.string().min(1),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const parsedPizzas = pizzas.map((pizza) => ({ ...pizza, totalPrice: pizza.price * pizza.amount }));

        const response = await createOrder(parsedPizzas, data);

        if (response?.status === 'success') {
            clearCart();

            if (onClose) {
                onClose();
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response?.message);
        }
    });

    const counterChange = (id: number, amount: number) => {
        if (amount === 0) {
            removeFromCart(id);
        } else {
            changeAmount(id, amount);
        }
    };

    const styles = ['flex-1', 'w-20 justify-center items-center flex', 'w-20 justify-center items-center flex'];

    const head = ['pizza name, ingredients', 'amount', 'price'];

    const rows = pizzas.map((pizza, index) => [
        <>
            <span className="text-black font-bold text-sm">{`${pizza.name}, ${pizza.size}, ${pizza.dough}`}</span>
            <br />
            {pizza.ingredients}
        </>,
        <Counter
            key={index}
            scheme="white"
            onChange={(count) => counterChange(pizza.id, count)}
            value={pizza.amount}
            min={0}
            max={5}
        />,
        pizza.price * pizza.amount,
    ]);

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Cart" description="Customize your order." />
            <div className="mt-4">
                <Table head={head} rows={rows} styles={styles} />
            </div>
            <div className="mt-4">
                <Title title="Delivery" description="Set your delivery details." />
            </div>
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Name" {...register('name')} />
                            {errors.name?.message && <Error>{errors.name.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Phone number" {...register('phoneNumber')} />
                            {errors.phoneNumber?.message && <Error>{errors.phoneNumber.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Street" {...register('street')} />
                            {errors.street?.message && <Error>{errors.street.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="House number" {...register('houseNumber')} />
                            {errors.houseNumber?.message && <Error>{errors.houseNumber.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="City" {...register('city')} />
                            {errors.city?.message && (
                                <p className="text-red text-xs font-medium">{errors.city.message}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <Button variant="white" type="button" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Order now
                        </Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
