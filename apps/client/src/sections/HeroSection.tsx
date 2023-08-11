'use client';

import Image from 'next/image';
import { Button } from '../components/Button';

export const HeroSection = () => {
    return (
        <div className="flex justify-between h-[512px]">
            <div className="w-full shrink-0 mt-32 flex flex-col items-center md:block md:w-auto">
                <h2 className="text-5xl text-white text-center font-bold max-w-xs md:text-left">
                    Best pizzeria in the city!
                </h2>
                <p className="text-white text-center font-medium mt-4 md:text-left">
                    Our pizza is always made with fresh ingredients.
                </p>
                <div className="mt-4">
                    <Button variant="white" onClick={() => document.querySelector('#menu')?.scrollIntoView()}>
                        Order now
                    </Button>
                </div>
            </div>
            <div className="hidden md:block self-center">
                <Image src="/hero-image.png" alt="Pizza image" width="500" height="300" priority />
            </div>
        </div>
    );
};
