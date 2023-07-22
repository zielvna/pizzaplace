export interface IOrderPizza {
    id: number;
    name: string;
    ingredients: string;
    size: 'small' | 'medium' | 'large';
    dough: 'thin' | 'thick';
    amount: number;
    price: number;
    totalPrice: number;
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
    pizzas: IOrderPizza[];
    deliveryDetails: IDeliveryDetails;
    totalPrice: number;
    status: 'preparing' | 'in delivery' | 'delivered';
}

export interface IPrices {
    small: number;
    medium: number;
    large: number;
}

export interface IPizza {
    id: number;
    name: string;
    ingredients: string;
    prices: IPrices;
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
}
