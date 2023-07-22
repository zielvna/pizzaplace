import { EditPizzaModal } from '@/src/modals/EditPizzaModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../../lib/api';
import { pizzas } from '../utils';

const pizza = pizzas[0];

jest.mock('../../lib/api');

const EditPizzaModalMock = () => {
    return (
        <>
            <EditPizzaModal pizza={pizza} />
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

describe('EditOrderModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'editPizza').mockImplementation(async () => ({
            status: 'error',
            message: 'Invalid data format',
        }));
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<EditPizzaModal pizza={pizza} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows 5 validation errors when update button is clicked and fields are empty', async () => {
        render(<EditPizzaModal pizza={pizza} />);

        const nameInput = screen.getByDisplayValue(/Margherita/);
        fireEvent.change(nameInput, { target: { value: '' } });

        const ingredientsInput = screen.getByDisplayValue(/tomato sauce, mozzarella cheese/);
        fireEvent.change(ingredientsInput, { target: { value: '' } });

        const smallPriceInput = screen.getByDisplayValue(/32/);
        fireEvent.change(smallPriceInput, { target: { value: '' } });

        const mediumPriceInput = screen.getByDisplayValue(/42/);
        fireEvent.change(mediumPriceInput, { target: { value: '' } });

        const largePriceInput = screen.getByDisplayValue(/52/);
        fireEvent.change(largePriceInput, { target: { value: '' } });

        const updateButton = screen.getByRole('button', { name: /Update/ });
        fireEvent.click(updateButton);

        expect((await screen.findAllByText(/must contain/)).length).toBe(5);
    });

    it('shows pizza data', async () => {
        render(<EditPizzaModal pizza={pizza} />);

        const nameInput = screen.getByDisplayValue(/Margherita/);
        expect(nameInput).toBeInTheDocument();

        const ingredientsInput = screen.getByDisplayValue(/tomato sauce, mozzarella cheese/);
        expect(ingredientsInput).toBeInTheDocument();

        const smallPriceInput = screen.getByDisplayValue(/32/);
        expect(smallPriceInput).toBeInTheDocument();

        const mediumPriceInput = screen.getByDisplayValue(/42/);
        expect(mediumPriceInput).toBeInTheDocument();

        const largePriceInput = screen.getByDisplayValue(/52/);
        expect(largePriceInput).toBeInTheDocument();
    });

    it('shows invalid data format error when update button is clicked and server returns error', async () => {
        render(<EditPizzaModal pizza={pizza} />);

        const updateButton = screen.getByRole('button', { name: /Update/ });
        fireEvent.click(updateButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows pizza successfully edited toast when update button is clicked and server returns success', async () => {
        jest.spyOn(API, 'editPizza').mockImplementation(async () => ({
            status: 'success',
            message: 'Pizza successfully edited',
        }));

        render(<EditPizzaModalMock />);

        const updateButton = screen.getByRole('button', { name: /Update/ });
        fireEvent.click(updateButton);

        expect(await screen.findByText('Pizza successfully edited')).toBeInTheDocument();
    });
});
