import { EditOrderModal } from '@/src/modals/EditOrderModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';
import * as API from '../../lib/api';
import { orders } from '../utils';

const order = orders[0];

jest.mock('../../lib/api');

const EditOrderModalMock = () => {
    return (
        <>
            <EditOrderModal order={order} />
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
        jest.spyOn(API, 'editOrder').mockImplementation(async () => ({
            status: 'error',
            message: 'Invalid data format',
        }));
    });

    it('calls on close function when close button is clicked', async () => {
        const onCloseMock = jest.fn();

        render(<EditOrderModal order={order} onClose={onCloseMock} />);

        const closeButton = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('shows invalid data format error when update button is clicked and server returns error', async () => {
        render(<EditOrderModal order={order} />);

        const updateButton = screen.getByRole('button', { name: /Update/ });
        fireEvent.click(updateButton);

        expect(await screen.findByText(/Invalid data format/)).toBeInTheDocument();
    });

    it('shows order successfully edited toast when update button is clicked and server returns success', async () => {
        jest.spyOn(API, 'editOrder').mockImplementation(async () => ({
            status: 'success',
            message: 'Order successfully edited',
        }));

        render(<EditOrderModalMock />);

        const updateButton = screen.getByRole('button', { name: /Update/ });
        fireEvent.click(updateButton);

        expect(await screen.findByText(/Order successfully edited/)).toBeInTheDocument();
    });
});
