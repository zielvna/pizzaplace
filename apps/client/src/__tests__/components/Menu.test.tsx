import { Menu } from '@/src/components/Menu';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../../lib/api';
import * as Store from '../../store';
import { cartPizzas, orders, user } from '../utils';

const setUserMock = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        refresh: jest.fn(),
        forward: jest.fn(),
        back: jest.fn(),
        prefrech: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

jest.mock('../../store');
jest.mock('../../lib/api');

const MenuMock = () => {
    return (
        <>
            <Menu isDashboard={false} passUser={user} />
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

describe('Menu', () => {
    beforeEach(() => {
        jest.spyOn(API, 'getOrders').mockImplementation(async () => ({
            status: 'success',
            data: { orders },
        }));
        jest.spyOn(API, 'logout').mockImplementation(async () => ({
            status: 'error',
            message: 'Error while trying to logout',
        }));
        jest.spyOn(Store, 'useStore').mockImplementation(() => ({ pizzas: [], setUser: setUserMock }));
    });

    afterEach(() => {
        setUserMock.mockReset();
    });

    it('shows login and register buttons when menu is not in dashboard and user is not logged in', () => {
        render(<Menu isDashboard={false} passUser={null} />);

        const loginElements = screen.getAllByText(/Login/);
        expect(loginElements[0]).not.toHaveClass('hidden');

        const registerElements = screen.getAllByText(/Register/);
        expect(registerElements[0]).not.toHaveClass('hidden');
    });

    it('shows profile and logout buttons when menu is in not in dashboard and user is logged in', () => {
        render(<Menu isDashboard={false} passUser={user} />);

        const profileElements = screen.getAllByText(/Profile/);
        expect(profileElements[0]).not.toHaveClass('hidden');

        const logoutElements = screen.getAllByText(/Logout/);
        expect(logoutElements[0]).not.toHaveClass('hidden');
    });

    it('shows pizzas, orders and logout buttons when menu is in dashboard and user is logged in', () => {
        render(<Menu isDashboard={true} passUser={user} />);

        const pizzasElements = screen.getAllByText(/Pizzas/);
        expect(pizzasElements[0]).not.toHaveClass('hidden');

        const ordersElements = screen.getAllByText(/Orders/);
        expect(ordersElements[0]).not.toHaveClass('hidden');

        const logoutElements = screen.getAllByText(/Logout/);
        expect(logoutElements[0]).not.toHaveClass('hidden');
    });

    it('shows and hides overlay when overlay open button is clicked', () => {
        render(<Menu isDashboard={true} passUser={null} />);

        const overlay = screen.getByTestId('overlay');

        const overlayOpenButton = screen.getByTestId('overlay-open-button');
        fireEvent.click(overlayOpenButton);

        expect(overlay).not.toHaveClass('hidden');

        const overlayCloseButton = screen.getByTestId('overlay-close-button');
        fireEvent.click(overlayCloseButton);

        expect(overlay).toHaveClass('hidden');
    });

    it('hides cart badge when number of pizzas in cart is 0', () => {
        render(<Menu isDashboard={true} passUser={null} />);

        const cartBadge = screen.getByText(/0/);
        expect(cartBadge).toHaveClass('hidden');
    });

    it('shows cart badge when number of pizzas in cart is more than 0', () => {
        jest.spyOn(Store, 'useStore').mockImplementation(() => ({ pizzas: cartPizzas }));

        render(<Menu isDashboard={true} passUser={null} />);

        const cartBadge = screen.getByText(/2/);
        expect(cartBadge).not.toHaveClass('hidden');
    });

    it('shows login modal when login button is clicked', () => {
        render(<Menu isDashboard={false} passUser={null} />);

        const loginElements = screen.getAllByText(/Login/);
        fireEvent.click(loginElements[0]);

        const loginModal = screen.getByText(/Login to your account/);
        expect(loginModal).toBeInTheDocument();
    });

    it('shows register modal when register button is clicked', () => {
        render(<Menu isDashboard={false} passUser={null} />);

        const registerElements = screen.getAllByText(/Register/);
        fireEvent.click(registerElements[0]);

        const registerModal = screen.getByText(/Register your account/);
        expect(registerModal).toBeInTheDocument();
    });

    it('shows cart modal when cart button is clicked', () => {
        render(<Menu isDashboard={false} passUser={null} />);

        const cartButton = screen.getByTestId('cart-button');
        fireEvent.click(cartButton);

        const cartModal = screen.getByText(/Customize your order/);
        expect(cartModal).toBeInTheDocument();
    });

    it('shows account modal when profile button is clicked', async () => {
        await act(async () => render(<Menu isDashboard={false} passUser={user} />));

        const profileElements = screen.getAllByText(/Profile/);
        fireEvent.click(profileElements[0]);

        expect(await screen.findByText(/Your account details/)).toBeInTheDocument();
    });

    it('shows error while trying to logout toast when logout button is clicked and server returns error', async () => {
        render(<MenuMock />);

        const logoutElements = screen.getAllByText(/Logout/);
        fireEvent.click(logoutElements[0]);

        expect(await screen.findByText(/Error while trying to logout/)).toBeInTheDocument();
    });

    it('shows account successfully logged out when logout toast and calls set user function when logout button is clicked and server returns success', async () => {
        jest.spyOn(API, 'logout').mockImplementation(async () => ({
            status: 'success',
            message: 'Account successfully logged out',
        }));

        render(<MenuMock />);

        const logoutElements = screen.getAllByText(/Logout/);
        fireEvent.click(logoutElements[0]);

        expect(await screen.findByText(/Account successfully logged out/)).toBeInTheDocument();
        expect(setUserMock).toHaveBeenCalledWith(null);
    });
});
