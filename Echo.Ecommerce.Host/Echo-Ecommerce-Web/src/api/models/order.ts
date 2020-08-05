/* tslint:disable */
import { OrderProduct } from './order-product';
import { User } from './user';
export interface Order {
  issueDate: string;
  orderId: number;
  orderProducts?: Array<OrderProduct>;
  price: number;
  user?: User;
}
