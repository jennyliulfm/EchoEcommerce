/* tslint:disable */
import { User } from './user';
export interface SocialUser extends User{
  authToken?: string;
  authorizationCode?: string;
  idToken?: string;
  name?: string;
  photoUrl?: string;
  provider?: string;
}
