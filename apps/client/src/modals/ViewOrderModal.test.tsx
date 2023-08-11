import { ViewOrderModal } from '@/src/modals/ViewOrderModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { orders } from '../__tests__/utils';

const order = orders[0];

describe('ViewOrderModal', () => {
    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<ViewOrderModal order={order} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows pizzas, delivery details, total price and status', () => {
        render(<ViewOrderModal order={order} />);

        const nameElement = screen.getByText(/Test/);
        expect(nameElement).toBeInTheDocument();

        const phoneNumberElement = screen.getByText(/123456789/);
        expect(phoneNumberElement).toBeInTheDocument();

        const addressElement = screen.getByText(/Test 1, Test/);
        expect(addressElement).toBeInTheDocument();

        const statusElement = screen.getByText(/delivered/);
        expect(statusElement).toBeInTheDocument();

        const pizzaNameElement = screen.getByText(/Margherita/);
        expect(pizzaNameElement).toBeInTheDocument();

        const totalPriceElement = screen.getAllByText(/64/);
        expect(totalPriceElement.length).toBeGreaterThan(0);
    });
});
