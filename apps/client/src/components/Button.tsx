'use client';

import { twMerge } from 'tailwind-merge';

type Props = Readonly<{
    children: React.ReactNode;
    scheme: keyof typeof schemas;
}> &
    Omit<JSX.IntrinsicElements['button'], 'className'>;

const schemas = {
    white: 'bg-white text-black',
    primary: 'bg-primary text-white',
    black: 'bg-black text-white',
};

export const Button = ({ children, scheme, ...props }: Props) => {
    return (
        <button className={twMerge('h-10 px-8 font-medium rounded', schemas[scheme])} {...props}>
            {children}
        </button>
    );
};
