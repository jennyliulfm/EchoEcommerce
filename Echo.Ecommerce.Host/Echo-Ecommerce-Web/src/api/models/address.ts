/* tslint:disable */
import { User } from './user';
export interface Address {
  addressId: number;
  city?: string;
  country?: string;
  street?: string;
  user?: User;
}
