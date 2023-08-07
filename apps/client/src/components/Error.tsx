'use client';

type Props = {
    children: React.ReactNode;
};

export const Error = ({ children }: Props) => {
    return (
        <p className="text-red text-xs font-medium" role="alert">
            {children}
        </p>
    );
};
