'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiCloseLine, RiMenuLine, RiShoppingCart2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { logout } from '../lib/api';
import { AccountModal } from '../modals/AccountModal';
import { CartModal } from '../modals/CartModal';
import { LoginModal } from '../modals/LoginModal';
import { RegisterModal } from '../modals/RegisterModal';
import { useStore } from '../store';
import { IUser } from '../types';
import { Button } from './Button';
import { Toast } from './Toast';

type Props = {
    isDashboard: boolean;
    passUser: IUser | null;
};

export const Menu = ({ isDashboard, passUser }: Props) => {
    const [isOverlayToggled, setIsOverlayToggled] = useState(false);
    const [isRegisterModalShown, setIsRegisterModalShown] = useState(false);
    const [isLoginModalShown, setIsLoginModalShown] = useState(false);
    const [isCartModalShown, setIsCartModalShown] = useState(false);
    const [isAccountModalShown, setIsAccountModalShown] = useState(false);
    const router = useRouter();
    const { pizzas, user, setUser } = useStore();

    const onLogoutButtonClick = async () => {
        const response = await logout();

        if (response.status === 'success') {
            setUser(null);

            router.push('/');
        }

        toast(<Toast text={response.message} />);
    };

    const currentUser = user === undefined ? passUser : user;

    const menuContent = (
        <ul className={twMerge('flex', !isOverlayToggled ? 'items-center' : 'flex-col items-center')} role="list">
            <li className={twMerge('m-2 cursor-pointer', !isDashboard && 'hidden')}>
                <Link href="/dashboard" className="text-white font-medium" onClick={router.refresh}>
                    Pizzas
                </Link>
            </li>
            <li className={twMerge('m-2 cursor-pointer', !isDashboard && 'hidden')}>
                <Link href="/dashboard/orders" className="text-white font-medium" onClick={router.refresh}>
                    Orders
                </Link>
            </li>
            <li
                className={twMerge(
                    'text-white font-medium m-2 cursor-pointer',
                    !isDashboard && currentUser ? 'block' : 'hidden'
                )}
                onClick={() => setIsAccountModalShown(true)}
            >
                Profile
            </li>
            <li
                className={twMerge('text-white font-medium m-2 cursor-pointer', currentUser ? 'block' : 'hidden')}
                onClick={onLogoutButtonClick}
            >
                Logout
            </li>
            <li
                className={twMerge(
                    'text-white font-medium m-2 cursor-pointer',
                    !isDashboard && !currentUser ? 'block' : 'hidden'
                )}
                onClick={() => setIsLoginModalShown(true)}
            >
                Login
            </li>
            <li
                className={twMerge('ml-2', !isDashboard && !currentUser ? 'block' : 'hidden')}
                onClick={() => setIsRegisterModalShown(true)}
            >
                <Button scheme="white">Register</Button>
            </li>
        </ul>
    );

    return (
        <div className="flex items-center">
            {isRegisterModalShown && (
                <RegisterModal isDashboard={false} onClose={() => setIsRegisterModalShown(false)} />
            )}
            {isLoginModalShown && <LoginModal isDashboard={false} onClose={() => setIsLoginModalShown(false)} />}
            {isCartModalShown && <CartModal onClose={() => setIsCartModalShown(false)} />}
            {isAccountModalShown && currentUser && (
                <AccountModal user={currentUser} onClose={() => setIsAccountModalShown(false)} />
            )}
            <div className="hidden md:flex">{menuContent}</div>
            <div
                className={twMerge('relative m-2', !isDashboard ? 'block' : 'hidden')}
                onClick={() => setIsCartModalShown(true)}
            >
                <RiShoppingCart2Line className="text-white text-3xl cursor-pointer" data-testid="cart-button" />
                <div
                    className={twMerge(
                        'absolute h-5 w-5 text-white font-bold text-xs flex justify-center items-center bg-red rounded-full right-[-10px] bottom-[-10px]',
                        pizzas.length > 0 ? 'flex' : 'hidden'
                    )}
                >
                    {pizzas.length}
                </div>
            </div>
            <div className="m-2 mr-0 md:hidden">
                <RiMenuLine
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => setIsOverlayToggled(true)}
                    data-testid="overlay-open-button"
                />
            </div>
            <div
                className={twMerge(
                    'fixed inset-0 z-[10000]',
                    isDashboard ? 'bg-black' : 'bg-primary',
                    !isOverlayToggled && 'hidden'
                )}
                data-testid="overlay"
            >
                <div className="h-16 mx-2 flex items-center justify-end">
                    <RiCloseLine
                        className="text-white text-3xl cursor-pointer"
                        onClick={() => setIsOverlayToggled(false)}
                        data-testid="overlay-close-button"
                    />
                </div>
                <div className="flex flex-col items-center h-full mt-16">{menuContent}</div>
            </div>
        </div>
    );
};
