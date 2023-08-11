import { CreatePizzaModal } from '@/src/modals/CreatePizzaModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../lib/api';

jest.mock('../lib/api');

const CreatePizzaModalMock = () => {
    return (
        <>
            <CreatePizzaModal />
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

describe('CreatePizzaModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'createPizza').mockImplementation(async () => {
            return { status: 'error', message: 'Invalid data format' };
        });
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<CreatePizzaModal onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows 5 validation errors when create button is clicked and inputs are empty', async () => {
        render(<CreatePizzaModal />);

        const createButton = screen.getByRole('button', { name: /Create/ });
        fireEvent.click(createButton);

        expect((await screen.findAllByText(/must contain/)).length).toBe(5);
    });

    it('shows invalid data format when create button is clicked and server returns error', async () => {
        render(<CreatePizzaModal />);

        const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Name/);
        fireEvent.change(nameInput, { target: { value: 'Margherita' } });

        const ingredientsInput: HTMLInputElement = screen.getByPlaceholderText(/Ingredients/);
        fireEvent.change(ingredientsInput, { target: { value: 'tomato sauce, mozzarella cheese' } });

        const smallPriceInput: HTMLInputElement = screen.getByPlaceholderText(/Small price/);
        fireEvent.change(smallPriceInput, { target: { value: '32' } });

        const mediumPriceInput: HTMLInputElement = screen.getByPlaceholderText(/Medium price/);
        fireEvent.change(mediumPriceInput, { target: { value: '42' } });

        const largePriceInput: HTMLInputElement = screen.getByPlaceholderText(/Large price/);
        fireEvent.change(largePriceInput, { target: { value: '52' } });

        const createButton = screen.getByRole('button', { name: /Create/ });
        fireEvent.click(createButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows pizza successfully created toast when create button is clicked and server returns success', async () => {
        jest.spyOn(API, 'createPizza').mockImplementation(async () => ({
            status: 'success',
            message: 'Pizza successfully created',
        }));

        render(<CreatePizzaModalMock />);

        const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Name/);
        fireEvent.change(nameInput, { target: { value: 'Margherita' } });

        const ingredientsInput: HTMLInputElement = screen.getByPlaceholderText(/Ingredients/);
        fireEvent.change(ingredientsInput, { target: { value: 'tomato sauce, mozzarella cheese' } });

        const smallPriceInput: HTMLInputElement = screen.getByPlaceholderText(/Small price/);
        fireEvent.change(smallPriceInput, { target: { value: '32' } });

        const mediumPriceInput: HTMLInputElement = screen.getByPlaceholderText(/Medium price/);
        fireEvent.change(mediumPriceInput, { target: { value: '42' } });

        const largePriceInput: HTMLInputElement = screen.getByPlaceholderText(/Large price/);
        fireEvent.change(largePriceInput, { target: { value: '52' } });

        const createButton = screen.getByRole('button', { name: /Create/ });
        fireEvent.click(createButton);

        expect(await screen.findByText(/Pizza successfully created/)).toBeInTheDocument();
    });
});
