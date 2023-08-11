import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { editPizza } from '../lib/api';
import { IPizza } from '../types';

type Props = {
    pizza: IPizza;
    onClose?: () => void;
};

export const EditPizzaModal = ({ pizza, onClose }: Props) => {
    const [error, setError] = useState('');

    const schema = z.object({
        name: z.string().min(1),
        ingredients: z.string().min(1),
        smallPrice: z.string().min(1),
        mediumPrice: z.string().min(1),
        largePrice: z.string().min(1),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: pizza.name,
            ingredients: pizza.ingredients,
            smallPrice: pizza.prices.small.toString(),
            mediumPrice: pizza.prices.medium.toString(),
            largePrice: pizza.prices.large.toString(),
        },
    });

    const onSubmit = handleSubmit(async ({ name, ingredients, smallPrice, mediumPrice, largePrice }) => {
        const response = await editPizza(pizza.id, name, ingredients, {
            small: +smallPrice,
            medium: +mediumPrice,
            large: +largePrice,
        });

        if (response.status === 'success') {
            if (onClose) {
                onClose();
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response.message);
        }
    });

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Edit pizza." description="Edit existing pizza." />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Name" {...register('name')} />
                            {errors.name?.message && <Error>{errors.name.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Ingredients" {...register('ingredients')} />
                            {errors.ingredients?.message && <Error>{errors.ingredients.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Small price" {...register('smallPrice')} />
                            {errors.smallPrice?.message && <Error>{errors.smallPrice.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Medium price" {...register('mediumPrice')} />
                            {errors.mediumPrice?.message && <Error>{errors.mediumPrice.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Large price" {...register('largePrice')} />
                            {errors.largePrice?.message && <Error>{errors.largePrice.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <Button variant="white" type="button" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary">Update</Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
