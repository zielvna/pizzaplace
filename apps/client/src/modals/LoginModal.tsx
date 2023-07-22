'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
import { getUser, login } from '../lib/api';
import { useStore } from '../store';

type Props = {
    isDashboard: boolean;
    onClose?: () => void;
};

export const LoginModal = ({ isDashboard, onClose }: Props) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const { setUser } = useStore();

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(4),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const { email, password } = data;

        const response = await login(email, password, isDashboard ? 'admin' : 'user');

        if (response.status === 'success') {
            const userResponse = await getUser();

            setUser(userResponse.data.user);

            if (isDashboard) {
                router.push('/dashboard');
            } else {
                if (onClose) {
                    onClose();
                }
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response.message);
        }
    });

    return (
        <Modal onClose={onClose} addBackground={!isDashboard}>
            <Title title="Login" description="Login to your account." />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="E-mail" {...register('email')} />
                            {errors.email?.message && <Error>{errors.email.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Password" type="password" {...register('password')} />
                            {errors.password?.message && <Error>{errors.password.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className={twMerge('flex', isDashboard ? 'justify-end' : 'justify-between')}>
                        <div className={twMerge(isDashboard && 'hidden')}>
                            <Button scheme="white" type="button" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                        <Button scheme="primary">Login</Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
