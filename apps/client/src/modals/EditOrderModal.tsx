import { useState } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { editOrder } from '../lib/api';
import { IOrder } from '../types';

type Props = {
    order: IOrder;
    onClose?: () => void;
};

export const EditOrderModal = ({ order, onClose }: Props) => {
    const [error, setError] = useState('');
    const [status, setStatus] = useState(order.status);

    const onSubmit = async () => {
        const response = await editOrder(order.id, status);

        if (response?.status === 'success') {
            if (onClose) {
                onClose();
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response.message);
        }
    };

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Edit order" description="Edit existing order." />
            <div className="mt-4">
                <p className="text-textGray">Status:</p>
                <div className="mt-2">
                    <Select
                        items={['preparing', 'in delivery', 'delivered']}
                        selected={order.status}
                        onChange={(item) => setStatus(item)}
                    />
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <Button variant="white" type="button" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Update
                    </Button>
                </div>
                <div className={twMerge('text-right', !error && 'hidden')}>
                    <Error>{error}</Error>
                </div>
            </div>
        </Modal>
    );
};
