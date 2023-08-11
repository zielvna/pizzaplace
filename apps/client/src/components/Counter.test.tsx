import { Counter } from '@/src/components/Counter';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Counter', () => {
    it('shows passed value', () => {
        render(<Counter scheme="white" value={1} min={0} max={3} />);

        const valueElement = screen.getByText(/1/);

        expect(valueElement).toBeInTheDocument();
    });

    it('decreases value when minus button is clicked', () => {
        render(<Counter scheme="white" value={1} min={0} max={3} />);

        const decrementButton = screen.getByRole('button', { name: /Decrement value/ });
        fireEvent.click(decrementButton);

        const valueElement = screen.getByText(/0/i);
        expect(valueElement).toBeInTheDocument();
    });

    it('increases value when plus button is clicked', () => {
        render(<Counter scheme="white" value={1} min={0} max={3} />);

        const incrementButton = screen.getByRole('button', { name: /Increment value/ });
        fireEvent.click(incrementButton);

        const valueElement = screen.getByText(/2/i);
        expect(valueElement).toBeInTheDocument();
    });

    it('does not decrease value when minus button is clicked and value is equal to min', () => {
        render(<Counter scheme="white" value={0} min={0} max={3} />);

        const decrementButton = screen.getByRole('button', { name: /Decrement value/ });
        fireEvent.click(decrementButton);

        const valueElement = screen.getByText(/0/i);
        expect(valueElement).toBeInTheDocument();
    });

    it('does not increase value when plus button is clicked and value is equal to max', () => {
        render(<Counter scheme="white" value={3} min={0} max={3} />);

        const incrementButton = screen.getByRole('button', { name: /Increment value/ });
        fireEvent.click(incrementButton);

        const valueElement = screen.getByText(/3/i);
        expect(valueElement).toBeInTheDocument();
    });

    it('calls on change function with new value as param when any button is clicked', () => {
        const onChangeMock = jest.fn();

        render(<Counter scheme="white" value={2} min={0} max={3} onChange={onChangeMock} />);

        const decrementButton = screen.getByRole('button', { name: /Decrement value/ });
        fireEvent.click(decrementButton);

        expect(onChangeMock).toHaveBeenCalledWith(1);
    });
});
