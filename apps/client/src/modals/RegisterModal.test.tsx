import { RegisterModal } from '@/src/modals/RegisterModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import { user } from '../__tests__/utils';
import * as API from '../lib/api';

const routerPushMock = jest.fn();

jest.mock('../lib/api');

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: routerPushMock,
        refresh: jest.fn(),
        forward: jest.fn(),
        back: jest.fn(),
        prefrech: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

const RegisterModalMock = ({ isDashboard }: { isDashboard: boolean }) => {
    return (
        <>
            <RegisterModal isDashboard={isDashboard} />
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

describe('RegisterModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'register').mockImplementation(async () => ({
            status: 'error',
            message: 'Invalid data format',
        }));
        jest.spyOn(API, 'getUser').mockImplementation(async () => ({ data: { user } }));
    });

    afterEach(() => {
        routerPushMock.mockReset();
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<RegisterModal isDashboard={false} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows 2 validation errors when register button is clicked and fields are empty', async () => {
        render(<RegisterModal isDashboard={false} />);

        const registerButton = screen.getByRole('button', { name: /Register/ });
        fireEvent.click(registerButton);

        expect(await screen.findByText(/must contain/)).toBeInTheDocument();
        expect(await screen.findByText(/Invalid email/)).toBeInTheDocument();
    });

    it('shows invalid data format error when register button is clicked and server returns error', async () => {
        render(<RegisterModal isDashboard={false} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const registerButton = screen.getByRole('button', { name: /Register/ });
        fireEvent.click(registerButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows account successfully registered toast when register button is clicked and server returns success', async () => {
        jest.spyOn(API, 'register').mockImplementation(async () => {
            return { status: 'success', message: 'Account successfully registered' };
        });

        render(<RegisterModalMock isDashboard={false} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const registerButton = screen.getByRole('button', { name: /Register/ });
        fireEvent.click(registerButton);

        expect(await screen.findByText(/Account successfully registered/)).toBeInTheDocument();
    });

    it('shows account successfully registered toast and calls router push when register button is clicked, is dashboard is true and server returns success', async () => {
        jest.spyOn(API, 'register').mockImplementation(async () => {
            return { status: 'success', message: 'Account successfully registered' };
        });

        render(<RegisterModalMock isDashboard={true} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const registerButton = screen.getByRole('button', { name: /Register/ });
        fireEvent.click(registerButton);

        expect(await screen.findByText(/Account successfully registered/)).toBeInTheDocument();
        expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
    });
});
