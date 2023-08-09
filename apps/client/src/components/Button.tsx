'use client';

import { twMerge } from 'tailwind-merge';

type Props = Readonly<{
    children: React.ReactNode;
    variant: keyof typeof variants;
}> &
    Omit<JSX.IntrinsicElements['button'], 'className'>;

const variants = {
    white: 'bg-white text-black',
    primary: 'bg-primary text-white',
    black: 'bg-black text-white',
};

export const Button = ({ children, variant, ...props }: Props) => {
    return (
        <button className={twMerge('h-10 px-8 font-medium rounded', variants[variant])} {...props}>
            {children}
        </button>
    );
};
