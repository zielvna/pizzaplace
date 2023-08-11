import { Modal } from '@/src/components/Modal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Modal', () => {
    it('calls on close function when background is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <Modal addBackground={true} onClose={onCloseMock}>
                Test
            </Modal>
        );

        const backgroundElement = screen.getByTestId('background');
        fireEvent.click(backgroundElement);

        expect(onCloseMock).toHaveBeenCalled();
    });
});
