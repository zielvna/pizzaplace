'use client';

import { twMerge } from 'tailwind-merge';

type Props = {
    addBackground: boolean;
    children: React.ReactNode;
    onClose?: () => void;
};

export const Modal = ({ addBackground, children, onClose }: Props) => {
    return (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center">
            <div className="fixed z-20 h-full bg-white py-4 px-2 w-full sm:h-auto sm:rounded sm:max-w-[512px]">
                {children}
            </div>
            <div
                className={twMerge(
                    'fixed inset-0',
                    onClose && 'cursor-pointer',
                    addBackground && 'bg-black opacity-50'
                )}
                onClick={onClose}
                data-testid="background"
            ></div>
        </div>
    );
};
