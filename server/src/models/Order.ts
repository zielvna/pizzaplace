import { Document, Model, Schema, model } from 'mongoose';
import { IDeliveryDetails, IOrderPizza } from '../types';

export interface IOrder extends Document {
    id: number;
    userId: number;
    pizzas: IOrderPizza[];
    deliveryDetails: IDeliveryDetails;
    totalPrice: number;
    status: 'preparing' | 'in delivery' | 'delivered';
}

interface IOrderModel extends Model<IOrder> {}

const schema = new Schema<IOrder>({
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    pizzas: [
        {
            name: { type: String, required: true },
            ingredients: { type: String, required: true },
            size: { type: String, enum: ['small', 'medium', 'large'], required: true },
            dough: { type: String, enum: ['thin', 'thick'], required: true },
            amount: { type: Number, required: true },
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
        },
    ],
    deliveryDetails: {
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: String, required: true },
        city: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['preparing', 'in delivery', 'delivered'], required: true },
});

export const Order: IOrderModel = model<IOrder, IOrderModel>('Order', schema);
