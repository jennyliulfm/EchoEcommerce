/* tslint:disable */
import { Order } from './order';
import { Product } from './product';
export interface OrderProduct {
  order?: Order;
  orderId: number;
  orderProductId: number;
  product?: Product;
  productId: number;
  quantity: number;
}
