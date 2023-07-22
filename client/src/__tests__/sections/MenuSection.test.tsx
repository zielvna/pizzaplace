import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MenuSection } from '../../sections/MenuSection';
import { pizzas } from '../utils';

describe('MenuSection', () => {
    it('shows passed pizzas', () => {
        render(<MenuSection pizzas={pizzas} />);

        const margheritaElement = screen.getByText(/Margherita/);
        expect(margheritaElement).toBeInTheDocument();

        const pepperoniElement = screen.getByText(/Pepperoni/);
        expect(pepperoniElement).toBeInTheDocument();
    });

    it('shows add pizza modal when add pizza button is clicked', async () => {
        render(<MenuSection pizzas={pizzas} />);

        const addPizzaButtons = screen.getAllByTestId('add-pizza-button');
        fireEvent.click(addPizzaButtons[0]);

        expect(await screen.findByText(/Choose pizza size, dough and amount/)).toBeInTheDocument();
    });
});
