'use client';

import { twMerge } from 'tailwind-merge';
import { poppins } from '../app/layout';

type Props = {
    text: string;
};

export const Toast = ({ text }: Props) => (
    <p className={twMerge('text-black font-medium', poppins.className)}>{text}</p>
);
