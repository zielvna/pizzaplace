import Image from 'next/image';
import { Title } from '../components/Title';

export const ProcessSection = () => {
    const processes = [
        {
            name: 'Order',
            description: 'Order pizza in our app',
            image: '/order-confirmed.svg',
            imageAlt: 'Order confirmed',
        },
        {
            name: 'Wait',
            description: 'Wait while we prepare and deliver',
            image: '/delivery-truck.svg',
            imageAlt: 'Delivery truck',
        },
        {
            name: 'Collect',
            description: 'Collect your food',
            image: '/order-delivered.svg',
            imageAlt: 'Order delivered',
        },
        {
            name: 'Eat',
            description: 'Eat it with your friends',
            image: '/pizza-sharing.svg',
            imageAlt: 'Pizza sharing',
        },
    ];

    return (
        <div className="my-16">
            <Title title="Process" description="See how our restaurant works." />
            <div className="mt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {processes.map(({ name, description, image, imageAlt }) => (
                        <div key={name} className="bg-backgroundGray rounded p-2 flex flex-col items-center">
                            <div className="relative w-full h-[96px]">
                                <Image src={image} fill alt={imageAlt} />
                            </div>
                            <div className="mt-4">
                                <p className="text-textGray text-center">
                                    <span className="text-black font-bold text-sm">{name}</span>
                                    <br />
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
