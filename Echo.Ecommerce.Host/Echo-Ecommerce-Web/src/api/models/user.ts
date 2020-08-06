/* tslint:disable */
import { IdentityUser } from './identity-user';
import { Address } from './address';
import { Role } from './role';
export interface User extends IdentityUser{
  address?: Address;
  firstName?: string;
  lastName?: string;
  password?: string;
  role: Role;
  validationCode?: string;
}
