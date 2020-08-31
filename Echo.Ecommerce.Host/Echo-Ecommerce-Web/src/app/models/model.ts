
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
    description: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Address {
    addressId?: number;
    street: string;
    city: string;
    country: string;
    passcode: string;
}

export interface Order {
    orderId?: number,
    price: number,
    user?: User,
    addressId: number,
    orderProducts: Array<OrderProduct>
}

export interface OrderProduct {
    productId?: number,
    quantity?: number
}

export interface BannerPhoto {
    id?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
    name?: string,
}

export interface CardProduct {
    id: number;
    title: string;
    description?: string;
    photo_url: string;
    price: number;
    discount?: number;
    category?: string;
    expiredHours?:number;
    reviews?: number;
}

export interface SalesEvent {
    id: number;
    name: string;
    photo_url: string;
    event_url: string;
}