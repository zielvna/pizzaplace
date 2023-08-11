import { LoginModal } from '@/src/modals/LoginModal';
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

const LoginModalMock = ({ isDashboard }: { isDashboard: boolean }) => {
    return (
        <>
            <LoginModal isDashboard={isDashboard} />
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

describe('LoginModal', () => {
    beforeEach(() => {
        jest.spyOn(API, 'login').mockImplementation(async () => ({ status: 'error', message: 'Invalid data format' }));
        jest.spyOn(API, 'getUser').mockImplementation(async () => ({ data: { user } }));
    });

    afterEach(() => {
        routerPushMock.mockReset();
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<LoginModal isDashboard={false} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows 2 validation errors when login button is clicked and fields are empty', async () => {
        render(<LoginModal isDashboard={false} />);

        const loginButton = screen.getByRole('button', { name: /Login/ });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/must contain/)).toBeInTheDocument();
        expect(await screen.findByText(/Invalid email/)).toBeInTheDocument();
    });

    it('shows invalid data format error when login button is clicked and server returns error', async () => {
        render(<LoginModal isDashboard={false} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const loginButton = screen.getByRole('button', { name: /Login/ });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows account successfully logged in toast when login button is clicked and server returns success', async () => {
        jest.spyOn(API, 'login').mockImplementation(async () => ({
            status: 'success',
            message: 'Account successfully logged in',
        }));

        render(<LoginModalMock isDashboard={false} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const loginButton = screen.getByRole('button', { name: /Login/ });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Account successfully logged in/)).toBeInTheDocument();
    });

    it('shows account successfully logged in toast and calls router push when login button is clicked, is dashboard is true and server returns success', async () => {
        jest.spyOn(API, 'login').mockImplementation(async () => ({
            status: 'success',
            message: 'Account successfully logged in',
        }));

        render(<LoginModalMock isDashboard={true} />);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        fireEvent.change(emailInput, { target: { value: 'user@user.com' } });

        const passwordInput = screen.getByPlaceholderText(/Password/);
        fireEvent.change(passwordInput, { target: { value: 'user' } });

        const loginButton = screen.getByRole('button', { name: /Login/ });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Account successfully logged in/)).toBeInTheDocument();
        expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
    });
});
