'use client';

type Props = {
    styles: string[];
    head: React.ReactNode[];
    rows: React.ReactNode[][];
};

export const Table = ({ styles, head, rows }: Props) => {
    return (
        <table className="text-textGray w-full">
            <thead>
                <tr className="bg-backgroundGray rounded-md flex mt-2 p-2">
                    {head.map((cell, index) => (
                        <td key={index} className={styles[index]}>
                            {cell}
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((item, index) => (
                    <tr key={index} className="bg-backgroundGray rounded-md flex mt-2 p-2">
                        {item.map((cell, index) => (
                            <td key={index} className={styles[index]}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                {rows.length === 0 && (
                    <tr className="bg-backgroundGray rounded-md mt-2 p-2 flex justify-center">
                        <td>no records</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
