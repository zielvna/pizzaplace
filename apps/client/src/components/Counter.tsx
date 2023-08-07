'use client';

import { twMerge } from 'tailwind-merge';
import { useCounter } from '../hooks/useCounter';

type Props = {
    scheme: keyof typeof schemas;
    value: number;
    min: number;
    max: number;
    onChange?: (count: number) => void;
};

const schemas = {
    white: 'bg-white',
    gray: 'bg-backgroundGray',
};

export const Counter = ({ scheme, value, min, max, onChange = () => {} }: Props) => {
    const [count, increment, decrement] = useCounter(value, min, max, onChange);

    return (
        <div className={twMerge('w-fit h-10 bg-white text-black font-bold rounded flex items-center', schemas[scheme])}>
            <button className="w-4" onClick={decrement} aria-label="Decrement value">
                -
            </button>
            <p className="w-8 font-medium px-4 flex justify-center">{count}</p>
            <button className="w-4" onClick={increment} aria-label="Increment value">
                +
            </button>
        </div>
    );
};
