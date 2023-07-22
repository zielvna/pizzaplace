'use client';

type Props = {
    title: string;
    description?: string;
};

export const Title = ({ title, description }: Props) => {
    return (
        <p className="text-textGray">
            <span className="text-black text-3xl font-bold">{title}</span>
            <br />
            {description}
        </p>
    );
};
