
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface Product {
    productId: number,
    name: string,
    description?: string,
    price: number,
    category: Category
}

export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
}

export interface CartProduct {
    productId: number;
    description:string;
    name: string;
    price: number;
    quantity: number;
}


export interface Address {
    addressId: number;
    street: string;
    city: string;
    country: string;
}

export interface Order {
    orderId: number,
    price: number,
    user: User,
    orderProducts: Array<OrderProduct>


}

export interface OrderProduct {
    productId: number,
    quantity: number
}