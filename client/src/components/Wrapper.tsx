'use client';

import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    scheme: keyof typeof schemas;
};

const schemas = {
    white: 'bg-white',
    primary: 'bg-primary',
    black: 'bg-black',
    gray: 'bg-backgroundGray',
} as const;

export const Wrapper = ({ children, scheme }: Props) => (
    <div className={twMerge('flex justify-center', schemas[scheme])}>
        <div className="mx-2 w-full max-w-5xl">{children}</div>
    </div>
);
