'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
    const [count, setCount] = useState(value);

    const changeCounter = (shouldIncrement: boolean) => {
        const newCount = shouldIncrement ? count + 1 : count - 1;

        if (newCount >= min && newCount <= max) {
            setCount(newCount);
            onChange(newCount);
        }
    };

    return (
        <div className={twMerge('w-fit h-10 bg-white text-black font-bold rounded flex items-center', schemas[scheme])}>
            <button className="w-4" onClick={() => changeCounter(false)}>
                -
            </button>
            <p className="w-8 font-medium px-4 flex justify-center">{count}</p>
            <button className="w-4" onClick={() => changeCounter(true)}>
                +
            </button>
        </div>
    );
};
