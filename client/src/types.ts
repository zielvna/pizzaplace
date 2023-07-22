export interface IPizza {
    id: number;
    name: string;
    ingredients: string;
    prices: {
        small: number;
        medium: number;
        large: number;
    };
}

export interface IOrderPizza {
    id: number;
    name: string;
    ingredients: string;
    size: string;
    dough: string;
    amount: number;
    price: number;
    totalPrice: number;
}

export interface ICartPizza {
    id: number;
    name: string;
    ingredients: string;
    size: string;
    dough: string;
    amount: number;
    price: number;
}

export interface IUser {
    id: number;
    email: string;
    role: string;
}

export interface IDeliveryDetails {
    name: string;
    phoneNumber: string;
    street: string;
    houseNumber: string;
    city: string;
}

export interface IOrder {
    id: number;
    userId: number;
    deliveryDetails: IDeliveryDetails;
    pizzas: IOrderPizza[];
    totalPrice: number;
    status: string;
}
