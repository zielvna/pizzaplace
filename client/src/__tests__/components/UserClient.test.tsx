import { UserClient } from '@/src/components/UserClient';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import * as NextNavigation from 'next/navigation';
import { admin, user } from '../utils';

const setUserMock = jest.fn();

jest.mock('../../store', () => ({
    useStore: () => ({
        setUser: setUserMock,
    }),
}));

jest.mock('next/navigation');

describe('UserClient', () => {
    beforeEach(() => {
        jest.spyOn(NextNavigation, 'usePathname').mockImplementation(() => '/dashboard');
        jest.spyOn(NextNavigation, 'useRouter').mockImplementation(() => ({
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
        }));
    });

    afterEach(() => {
        setUserMock.mockReset();
    });

    it('calls set user function with passed user', async () => {
        await act(() => render(<UserClient passUser={user} />));

        expect(setUserMock).toHaveBeenCalledWith(user);
    });

    it('hides button when user is not an admin', async () => {
        await act(() => render(<UserClient passUser={user} />));

        const switchButton = screen.getByTestId('switch-button-container');
        expect(switchButton).toHaveClass('hidden');
    });

    it('shows button when user is an admin', async () => {
        await act(() => render(<UserClient passUser={admin} />));

        const switchButton = screen.getByTestId('switch-button-container');
        expect(switchButton).not.toHaveClass('hidden');
    });

    it('shows dashboard text when user client is in home', async () => {
        jest.spyOn(NextNavigation, 'usePathname').mockImplementation(() => '/');

        await act(() => render(<UserClient passUser={user} />));

        const switchButton = screen.getByRole('button', { name: /Dashboard/ });
        expect(switchButton).toBeInTheDocument();
    });

    it('shows home text when user client is in dashboard', async () => {
        await act(() => render(<UserClient passUser={user} />));

        const switchButton = screen.getByRole('button', { name: /Home/ });
        expect(switchButton).toBeInTheDocument();
    });
});
