'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/Button';

export const metadata: Metadata = {
    title: '404 Not Found',
};

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="bg-primary h-screen flex flex-col items-center justify-center">
            <p className="text-white text-2xl font-bold">Page not found</p>
            <div className="mt-4">
                <Link href="/" onClick={router.refresh}>
                    <Button variant="white">Go to the home page</Button>
                </Link>
            </div>
        </div>
    );
}
