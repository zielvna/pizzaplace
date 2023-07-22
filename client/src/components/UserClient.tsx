'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useStore } from '../store';
import { IUser } from '../types';
import { Button } from './Button';

type Props = {
    passUser: IUser | null;
    children?: React.ReactNode;
};

export const UserClient = ({ passUser, children }: Props) => {
    const { user, setUser } = useStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setUser(passUser);
    }, []); // eslint-disable-line

    const currentUser = user === undefined ? passUser : user;
    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <>
            {children}
            <div
                className={twMerge(
                    'fixed right-4 bottom-4 z-[10000]',
                    currentUser && currentUser.role === 'admin' ? 'block' : 'hidden'
                )}
                data-testid="switch-button-container"
            >
                <Link href={isDashboard ? '/' : '/dashboard'} onClick={() => router.refresh()}>
                    <Button scheme={isDashboard ? 'primary' : 'black'}>{isDashboard ? 'Home' : 'Dashboard'}</Button>
                </Link>
            </div>
        </>
    );
};
