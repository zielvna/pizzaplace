import { PizzasSection } from '@/src/sections/PizzasSection';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import { pizzas } from '../__tests__/utils';

jest.mock('../lib/api', () => ({
    getPizzas: async () => ({ status: 'success', data: { pizzas } }),
    deletePizza: async () => ({ status: 'success', message: 'Pizza successfully deleted' }),
}));

const PizzasSectionMock = () => {
    return (
        <>
            <PizzasSection passPizzas={pizzas} />
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

describe('PizzasSection', () => {
    it('shows passed pizzas', async () => {
        await act(() => render(<PizzasSection passPizzas={pizzas} />));

        const margheritaElement = screen.getByText(/Margherita/);
        expect(margheritaElement).toBeInTheDocument();

        const pepperoniElement = screen.getByText(/Pepperoni/);
        expect(pepperoniElement).toBeInTheDocument();
    });

    it('shows create pizza modal when create pizza button is clicked', async () => {
        await act(() => render(<PizzasSection passPizzas={pizzas} />));

        const createPizzaButton = screen.getByRole('button', { name: /Create pizza/ });
        fireEvent.click(createPizzaButton);

        const createPizzaModal = screen.findByText(/Edit existing pizza/);
        waitFor(() => expect(createPizzaModal).toBeInTheDocument());
    });

    it('shows edit pizza modal when edit pizza button is clicked', async () => {
        await act(() => render(<PizzasSection passPizzas={pizzas} />));

        const editPizzaButtons = screen.getAllByTestId('edit-pizza-button');
        fireEvent.click(editPizzaButtons[0]);

        const editPizzaModal = screen.getByText(/Edit existing pizza/);
        expect(editPizzaModal).toBeInTheDocument();
    });

    it('shows pizza successfully deleted when delete pizza button is clicked', async () => {
        await act(() => render(<PizzasSectionMock />));

        const deletePizzaButton = screen.getAllByTestId('delete-pizza-button');
        fireEvent.click(deletePizzaButton[0]);

        expect(await screen.findByText(/Pizza successfully deleted/)).toBeInTheDocument();
    });
});
