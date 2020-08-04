
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
    categoryId: number,
    categoryName: string,
    description: string
}

export interface CartProduct {
    productId: number,
    name: string,
    price: number,
    amount: number,
}

