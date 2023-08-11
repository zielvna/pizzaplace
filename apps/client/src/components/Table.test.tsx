import { Table } from '@/src/components/Table';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const styles = ['flex-1', 'w-20 justify-center items-center flex', 'w-20 justify-center items-center flex'];

const items = ['id', 'e-mail', 'role'];

const additionalItems = [
    [1, 'admin@admin.com', 'admin'],
    [2, 'user@user.com', 'user'],
];

describe('Table', () => {
    it('shows no records text', () => {
        render(<Table head={items} rows={[]} styles={styles} />);

        const noRecordsElement = screen.getByText(/no records/);
        expect(noRecordsElement).toBeInTheDocument();
    });

    it('shows passed items and does not show no records text', () => {
        render(<Table head={items} rows={additionalItems} styles={styles} />);

        const noRecordsElement = screen.queryByText(/no records/);
        expect(noRecordsElement).not.toBeInTheDocument();

        const userElement = screen.getByText(/1/);
        expect(userElement).toBeInTheDocument();

        const adminElement = screen.getByText(/2/);
        expect(adminElement).toBeInTheDocument();
    });
});
