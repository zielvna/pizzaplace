import { Button } from '@/src/components/Button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
    it('shows passed text', () => {
        render(<Button variant="white">Test</Button>);

        const buttonElement = screen.getByRole('button', { name: /Test/ });
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls on click function on click', () => {
        const onClickMock = jest.fn();

        render(
            <Button variant="white" onClick={onClickMock}>
                Test
            </Button>
        );

        const buttonElement = screen.getByRole('button', { name: /Test/ });
        fireEvent.click(buttonElement);

        expect(onClickMock).toHaveBeenCalled();
    });
});
