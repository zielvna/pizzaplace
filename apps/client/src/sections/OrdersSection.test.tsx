import { OrdersSection } from '@/src/sections/OrdersSection';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import { orders } from '../__tests__/utils';

jest.mock('../lib/api', () => ({
    getAllOrders: async () => ({ status: 'success', data: { orders } }),
    deleteOrder: async () => ({ status: 'success', message: 'Order successfully deleted' }),
}));

const OrdersSectionMock = () => {
    return (
        <>
            <OrdersSection passOrders={orders} />
            <ToastContainer
                position="bottom-left"
                hideProgressBar={true}
                closeButton={false}
                draggable={false}
                transition={Slide}
            />
        </>
    );
};

describe('OrdersSection', () => {
    it('shows passed orders', async () => {
        await act(() => render(<OrdersSection passOrders={orders} />));

        const firstOrder = screen.getByText(/#1/);
        expect(firstOrder).toBeInTheDocument();

        const secondOrder = screen.getByText(/#2/);
        expect(secondOrder).toBeInTheDocument();
    });

    it('shows edit order modal when edit order button is clicked', async () => {
        await act(() => render(<OrdersSection passOrders={orders} />));

        const editOrderButtons = screen.getAllByTestId('edit-order-button');
        fireEvent.click(editOrderButtons[0]);

        const editOrderModal = screen.getByText(/Edit existing order/);
        expect(editOrderModal).toBeInTheDocument();
    });

    it('show view order modal when view order button is clicked', async () => {
        await act(() => render(<OrdersSection passOrders={orders} />));

        const viewOrderButtons = screen.getAllByTestId('view-order-button');
        fireEvent.click(viewOrderButtons[0]);

        const viewOrderModal = screen.getByText(/View order details/);
        expect(viewOrderModal).toBeInTheDocument();
    });

    it('shows order successfully deleted when delete order button is clicked and server returns success', async () => {
        await act(() => render(<OrdersSectionMock />));

        const deleteOrderButtons = screen.getAllByTestId('delete-order-button');
        fireEvent.click(deleteOrderButtons[0]);

        expect(await screen.findByText(/Order successfully deleted/)).toBeInTheDocument();
    });
});
