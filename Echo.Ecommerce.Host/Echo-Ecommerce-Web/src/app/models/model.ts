
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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