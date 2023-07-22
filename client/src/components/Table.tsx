'use client';

type Props = {
    styles: string[];
    items: React.ReactNode[][];
};

export const Table = ({ styles, items }: Props) => {
    return (
        <div className="text-textGray">
            {items.map((item, index) => (
                <div key={index} className="bg-backgroundGray rounded-md flex mt-2 p-2">
                    {item.map((cell, index) => (
                        <div key={index} className={styles[index]}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
            {items.length < 2 && (
                <div className="bg-backgroundGray rounded-md mt-2 p-2 flex justify-center">no records</div>
            )}
        </div>
    );
};
