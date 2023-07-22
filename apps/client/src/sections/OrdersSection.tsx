'use client';

import { deleteOrder, getAllOrders } from '@/src/lib/api';
import { EditOrderModal } from '@/src/modals/EditOrderModal';
import { IOrder } from '@/src/types';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Table } from '../components/Table';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { ViewOrderModal } from '../modals/ViewOrderModal';

type Props = {
    passOrders: IOrder[];
};

export const OrdersSection = ({ passOrders }: Props) => {
    const [isViewOrderModalShown, setIsViewOrderModalShown] = useState(false);
    const [isEditOrderModalShown, setIsEditOrderModalShown] = useState(false);
    const [orders, setOrders] = useState<IOrder[]>(passOrders);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    useEffect(() => {
        if (selectedOrder === null) {
            fetchOrders();
        }
    }, [selectedOrder]);

    const fetchOrders = async () => {
        const response = await getAllOrders();

        if (response.status === 'success') {
            setOrders(response.data.orders);
        }
    };

    const onDeleteClick = async (id: number) => {
        const response = await deleteOrder(id);
        toast(<Toast text={response.message} />);

        fetchOrders();
    };

    const onEditClick = async (order: IOrder) => {
        setSelectedOrder(order);
        setIsEditOrderModalShown(true);
    };

    const onViewClick = async (order: IOrder) => {
        setSelectedOrder(order);
        setIsViewOrderModalShown(true);
    };

    const closeModals = () => {
        setIsViewOrderModalShown(false);
        setIsEditOrderModalShown(false);
    };

    const styles = [
        'flex-1',
        'w-28 justify-center items-center text-center hidden sm:flex',
        'w-40 justify-center items-center text-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center flex',
    ];

    const head = ['order', 'client', 'delivery', 'status', 'total price', 'actions'];

    const rows = orders.map((order) => [
        <div
            key={order.id}
            className="cursor-pointer"
            onClick={() => onViewClick(order)}
            data-testid="view-order-button"
        >
            <span className="text-black font-bold text-sm">#{order.id}</span>
            <br />
            Order details
        </div>,
        <>
            {order.deliveryDetails.name},
            <br />
            {order.deliveryDetails.phoneNumber}
        </>,
        <>
            {order.deliveryDetails.street} {order.deliveryDetails.houseNumber},<br />
            {order.deliveryDetails.city}
        </>,
        order.status,
        order.totalPrice,
        <>
            <RiPencilLine
                className="text-textGray text-2xl cursor-pointer"
                onClick={() => onEditClick(order)}
                data-testid="edit-order-button"
            />
            <RiDeleteBinLine
                className="text-textGray text-2xl cursor-pointer"
                onClick={() => onDeleteClick(order.id)}
                data-testid="delete-order-button"
            />
        </>,
    ]);

    return (
        <div className="mt-4">
            {isViewOrderModalShown && selectedOrder && <ViewOrderModal order={selectedOrder} onClose={closeModals} />}
            {isEditOrderModalShown && selectedOrder && <EditOrderModal order={selectedOrder} onClose={closeModals} />}
            <div className=" bg-white py-4 px-2 w-full rounded">
                <Title title="Orders" description="Manage orders" />
                <div className="mt-4">
                    <Table items={[head, ...rows]} styles={styles} />
                </div>
            </div>
        </div>
    );
};
