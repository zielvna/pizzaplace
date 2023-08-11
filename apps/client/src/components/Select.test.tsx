import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
    it('highlights selected item', () => {
        render(<Select items={['apple', 'banana', 'peach']} selected="banana" />);

        const selectElement = screen.getByRole('button', { name: /banana/ });
        expect(selectElement).toHaveClass('bg-primary');
    });

    it('highlights clicked item', () => {
        render(<Select items={['apple', 'banana', 'peach']} selected="banana" />);

        const selectElement = screen.getByRole('button', { name: /apple/ });
        fireEvent.click(selectElement);

        expect(selectElement).toHaveClass('bg-primary');
    });

    it('calls on change function with item as param when item is clicked', () => {
        const onChangeMock = jest.fn();

        render(<Select items={['apple', 'banana', 'peach']} selected="banana" onChange={onChangeMock} />);

        const selectElement = screen.getByRole('button', { name: /apple/ });
        fireEvent.click(selectElement);

        expect(onChangeMock).toHaveBeenCalledWith('apple');
    });
});
