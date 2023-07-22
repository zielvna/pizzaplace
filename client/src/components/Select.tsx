'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    items: string[];
    selected: string;
    onChange?: (item: string) => void;
};

export const Select = ({ items, selected, onChange = () => {} }: Props) => {
    const [select, setSelect] = useState<number | null>(null);

    useEffect(() => {
        const index = items.findIndex((element) => element === selected);
        setSelect(index >= 0 ? index : 0);
    }, []); // eslint-disable-line

    const onClick = (item: string, index: number) => {
        onChange(item);
        setSelect(index);
    };

    return (
        <div className="flex flex-wrap flex-col sm:flex-row">
            {items.map((item, index) => (
                <button
                    key={item}
                    className={twMerge(
                        'w-fit bg-backgroundGray text-textGray font-small py-1 px-4 rounded-full cursor-pointer',
                        index !== 0 && 'mt-2 sm:mt-0 sm:ml-2',
                        select === index && 'bg-primary text-white'
                    )}
                    onClick={() => onClick(item, index)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};
