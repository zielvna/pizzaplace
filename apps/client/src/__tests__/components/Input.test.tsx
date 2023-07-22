import { Input } from '@/src/components/Input';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Input', () => {
    it('shows typed text', () => {
        render(<Input placeholder="Test" />);

        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Test/);
        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(inputElement.value).toBe('test');
    });

    it('calls on change function on change', () => {
        const onChangeMock = jest.fn();

        render(<Input placeholder="Test" onChange={onChangeMock} />);

        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Test/);
        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(onChangeMock).toHaveBeenCalled();
    });
});
