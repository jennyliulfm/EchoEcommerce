/* tslint:disable */
import { Category } from './category';
export interface Product {
  category?: Category;
  description?: string;
  name?: string;
  price: number;
  productId: number;
  quantity: number;
}
