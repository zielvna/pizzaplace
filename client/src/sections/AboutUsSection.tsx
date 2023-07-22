'use client';

import dynamic from 'next/dynamic';
import { Title } from '../components/Title';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
});

export const AboutUsSection = () => {
    const position: [number, number] = [52.2298, 21.0118];

    return (
        <div className="my-16">
            <Title title="About us" description="More information about us." />
            <div className="mt-4">
                <div className="block md:flex">
                    <div className="flex-1 bg-backgroundGray text-textGray p-2 rounded flex flex-col justify-between md:mr-4">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <p className="mt-4">
                            Phone number: +48 123 456 789
                            <br />
                            Address: Warszawska 1, Warszawa
                        </p>
                    </div>
                    <div className="w-full h-[250px] mt-4 md:w-[500px] md:mt-0">
                        <Map position={position} />
                    </div>
                </div>
            </div>
        </div>
    );
};
