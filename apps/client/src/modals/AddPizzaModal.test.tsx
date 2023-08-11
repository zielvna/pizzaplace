import { AddPizzaModal } from '@/src/modals/AddPizzaModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import { pizzas } from '../__tests__/utils';

const pizza = pizzas[0];

const onCloseMock = jest.fn();
const addToCartMock = jest.fn();

jest.mock('../store', () => ({
    useStore: () => ({
        addToCart: addToCartMock,
    }),
}));

const AddPizzaModalMock = () => {
    return (
        <>
            <AddPizzaModal pizza={pizza} />
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

describe('AddPizzaModal', () => {
    it('calls on close function when close button is clicked', () => {
        render(<AddPizzaModal pizza={pizza} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows pizza name, ingredients and price', () => {
        render(<AddPizzaModal pizza={pizza} />);

        const pizzaNameElement = screen.getByText(/Margherita/);
        expect(pizzaNameElement).toBeInTheDocument();

        const pizzaIngredientsElement = screen.getByText(/tomato sauce, mozzarella cheese/);
        expect(pizzaIngredientsElement).toBeInTheDocument();

        const pizzaPriceElement = screen.getByText(/32/);
        expect(pizzaPriceElement).toBeInTheDocument();
    });

    it('updates current price when size is changed', () => {
        render(<AddPizzaModal pizza={pizza} />);

        const largeButton = screen.getByText(/large/);
        fireEvent.click(largeButton);

        const pizzaPriceElement = screen.getByText(/52/);
        expect(pizzaPriceElement).toBeInTheDocument();
    });

    it('should show pizza successfully added toast and call add to cart function when add to cart button is clicked', async () => {
        render(<AddPizzaModalMock />);

        const addPizzaButton = screen.getByText(/Add to cart/);
        fireEvent.click(addPizzaButton);

        expect(await screen.findByText(/Pizza successfully added to cart/)).toBeInTheDocument();
        expect(addToCartMock).toHaveBeenCalled();
    });
});
