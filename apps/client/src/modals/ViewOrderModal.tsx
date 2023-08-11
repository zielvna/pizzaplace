import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { Title } from '../components/Title';
import { IOrder } from '../types';

type Props = {
    order: IOrder;
    onClose?: () => void;
};

export const ViewOrderModal = ({ order, onClose }: Props) => {
    const {
        pizzas,
        deliveryDetails: { name, phoneNumber, street, houseNumber, city },
        totalPrice,
        status,
    } = order;

    const styles = ['flex-1', 'w-20 justify-center items-center flex', 'w-20 justify-center items-center flex'];

    const head = ['pizza name, ingredients', 'amount', 'total price'];

    const rows = pizzas.map((pizza) => [
        <>
            <span className="text-black font-bold text-sm">{`${pizza.name}, ${pizza.size}, ${pizza.dough}`}</span>
            <br />
            {pizza.ingredients}
        </>,
        pizza.amount,
        pizza.price * pizza.amount,
    ]);

    const lastRow = ['total:', '', totalPrice];

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Order" description="View order details." />
            <div className="mt-4">
                <p className="text-textGray">
                    Name: {name}
                    <br />
                    Phone number: {phoneNumber}
                    <br />
                    Address: {street} {houseNumber}, {city}
                </p>
            </div>
            <div className="mt-4">
                <Table head={head} rows={rows} styles={styles} />
            </div>
            <div className="mt-4">
                <p className="text-textGray">Status: {status}</p>
            </div>
            <div className="mt-4">
                <Button variant="white" type="button" onClick={onClose}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};
