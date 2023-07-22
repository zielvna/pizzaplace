import { CartModal } from '@/src/modals/CartModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../../lib/api';
import { cartPizzas } from '../utils';

const removeFromCartMock = jest.fn();
const changeAmountMock = jest.fn();
const clearCartMock = jest.fn();

jest.mock('../../store', () => ({
    useStore: () => ({
        pizzas: cartPizzas,
        removeFromCart: removeFromCartMock,
        changeAmount: changeAmountMock,
        clearCart: clearCartMock,
    }),
}));

jest.mock('../../lib/api');

const CartModalMock = () => {
    return (
        <>
            <CartModal />
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

describe('CartModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'createOrder').mockImplementation(async () => ({
            status: 'error',
            message: 'Invalid data format',
        }));
    });

    afterEach(() => {
        removeFromCartMock.mockReset();
        changeAmountMock.mockReset();
        clearCartMock.mockReset();
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<CartModal onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows 2 pizzas', () => {
        render(<CartModal />);

        const margheritaElement = screen.getByText(/Margherita/);
        expect(margheritaElement).toBeInTheDocument();

        const pepperoniElement = screen.getByText(/Pepperoni/);
        expect(pepperoniElement).toBeInTheDocument();
    });

    it('calls change amount function with when plus button is clicked and pizza amount is more than 0 and less than 5', () => {
        render(<CartModal />);

        const plusButton = screen.getAllByRole('button', { name: /\+/ });
        fireEvent.click(plusButton[1]);

        expect(changeAmountMock).toHaveBeenCalled();
    });

    it('calls remove from cart function when minus button is clicked and pizza amount is 0', () => {
        render(<CartModal />);

        const minusButtons = screen.getAllByRole('button', { name: /-/ });
        fireEvent.click(minusButtons[1]);

        expect(removeFromCartMock).toHaveBeenCalled();
    });

    it('shows 5 validation errors when order now button is clicked and fields are empty', async () => {
        render(<CartModal />);

        const orderNowButton = screen.getByRole('button', { name: /Order now/ });
        fireEvent.click(orderNowButton);

        expect((await screen.findAllByText(/must contain/)).length).toBe(5);
    });

    it('shows invalid data format error when order now button is clicked and server returns error', async () => {
        render(<CartModal />);

        const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Name/);
        fireEvent.change(nameInput, { target: { value: 'Test' } });

        const phoneNumberInput: HTMLInputElement = screen.getByPlaceholderText(/Phone number/);
        fireEvent.change(phoneNumberInput, { target: { value: '123456789' } });

        const streetInput: HTMLInputElement = screen.getByPlaceholderText(/Street/);
        fireEvent.change(streetInput, { target: { value: 'Test' } });

        const houseNumberInput: HTMLInputElement = screen.getByPlaceholderText(/House number/);
        fireEvent.change(houseNumberInput, { target: { value: '1' } });

        const cityInput: HTMLInputElement = screen.getByPlaceholderText(/City/);
        fireEvent.change(cityInput, { target: { value: 'Test' } });

        const orderNowButton = screen.getByRole('button', { name: /Order now/ });
        fireEvent.click(orderNowButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows order successfully created toast and call clear cart function when order now button is clicked and server returns success', async () => {
        jest.spyOn(API, 'createOrder').mockImplementation(async () => ({
            status: 'success',
            message: 'Order successfully created',
        }));

        render(<CartModalMock />);

        const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Name/);
        fireEvent.change(nameInput, { target: { value: 'Test' } });

        const phoneNumberInput: HTMLInputElement = screen.getByPlaceholderText(/Phone number/);
        fireEvent.change(phoneNumberInput, { target: { value: '123456789' } });

        const streetInput: HTMLInputElement = screen.getByPlaceholderText(/Street/);
        fireEvent.change(streetInput, { target: { value: 'Test' } });

        const houseNumberInput: HTMLInputElement = screen.getByPlaceholderText(/House number/);
        fireEvent.change(houseNumberInput, { target: { value: '1' } });

        const cityInput: HTMLInputElement = screen.getByPlaceholderText(/City/);
        fireEvent.change(cityInput, { target: { value: 'Test' } });

        const orderNowButton = screen.getByRole('button', { name: /Order now/ });
        fireEvent.click(orderNowButton);

        expect(await screen.findByText(/Order successfully created/)).toBeInTheDocument();
        expect(clearCartMock).toHaveBeenCalled();
    });
});
