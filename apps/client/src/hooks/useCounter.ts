import { useState } from 'react';

export const useCounter = (value: number, min: number, max: number, onChange: (value: number) => void) => {
    const [count, setCount] = useState(value);

    const changeCounter = (shouldIncrement: boolean) => {
        const newValue = shouldIncrement ? count + 1 : count - 1;

        if (newValue >= min && newValue <= max) {
            setCount(newValue);
            onChange(newValue);
        }
    };

    const increment = () => {
        changeCounter(true);
    };

    const decrement = () => {
        changeCounter(false);
    };

    return [count, increment, decrement] as const;
};
