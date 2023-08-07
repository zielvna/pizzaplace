'use client';

import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    variant: keyof typeof variants;
};

const variants = {
    white: 'bg-white',
    primary: 'bg-primary',
    black: 'bg-black',
    gray: 'bg-backgroundGray',
} as const;

export const Wrapper = ({ children, variant }: Props) => (
    <div className={twMerge('flex justify-center', variants[variant])}>
        <div className="mx-2 w-full max-w-5xl">{children}</div>
    </div>
);
