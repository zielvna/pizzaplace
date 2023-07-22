import { AccountModal } from '@/src/modals/AccountModal';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../../lib/api';
import { orders, user } from '../utils';

jest.mock('../../lib/api');

const AccountModalMock = () => {
    return (
        <>
            <AccountModal user={user} />
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

describe('AccountModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'getOrders').mockImplementation(async () => ({ status: 'success', data: { orders } }));
        jest.spyOn(API, 'changePassword').mockImplementation(async () => ({
            status: 'error',
            message: 'Invalid password',
        }));
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        await act(async () => render(<AccountModal user={user} onClose={onCloseMock} />));

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows e-mail address and passed orders', async () => {
        await act(async () => render(<AccountModal user={user} />));

        const emailElement = screen.getByText(/user@user.com/);
        expect(emailElement).toBeInTheDocument();

        const firstOrder = screen.getByText(/#1/);
        expect(firstOrder).toBeInTheDocument();

        const secondOrder = screen.getByText(/#2/);
        expect(secondOrder).toBeInTheDocument();
    });

    it('shows view order modal when view order button is clicked', async () => {
        await act(async () => render(<AccountModal user={user} />));

        const orderButtons = screen.getAllByTestId('view-order-button');
        fireEvent.click(orderButtons[0]);

        const viewOrderModal = screen.getByText(/View order details/);
        expect(viewOrderModal).toBeInTheDocument();
    });

    it('shows 2 validation errors when change password button is clicked and fields are empty', async () => {
        await act(async () => render(<AccountModal user={user} />));

        const changePasswordButton = screen.getByRole('button', { name: /Change password/ });
        fireEvent.click(changePasswordButton);

        expect((await screen.findAllByText(/must contain/)).length).toBe(2);
    });

    it('shows invalid password error when change password button is clicked and server returns error', async () => {
        await act(async () => render(<AccountModal user={user} />));

        const passwordInput: HTMLInputElement = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        const newPasswordInput: HTMLInputElement = screen.getByPlaceholderText(/New password/);
        fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

        const changePasswordButton = screen.getByRole('button', { name: /Change password/ });
        fireEvent.click(changePasswordButton);

        expect(await screen.findByText(/Invalid password/)).toBeInTheDocument();
    });

    it('shows password successfully changed toast when change password button is clicked and server returns success', async () => {
        jest.spyOn(API, 'changePassword').mockImplementation(async () => ({
            status: 'success',
            message: 'Password successfully changed',
        }));

        await act(async () => render(<AccountModalMock />));

        const passwordInput: HTMLInputElement = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        const newPasswordInput: HTMLInputElement = screen.getByPlaceholderText(/New password/);
        fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

        const changePasswordButton = screen.getByRole('button', { name: /Change password/ });
        fireEvent.click(changePasswordButton);

        expect(await screen.findByText(/Password successfully changed/)).toBeInTheDocument();
    });
});
