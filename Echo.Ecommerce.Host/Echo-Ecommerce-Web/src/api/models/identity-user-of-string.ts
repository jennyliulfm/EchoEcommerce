/* tslint:disable */
export interface IdentityUserOfString {
  accessFailedCount: number;
  concurrencyStamp?: string;
  email?: string;
  emailConfirmed: boolean;
  id?: string;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  normalizedEmail?: string;
  normalizedUserName?: string;
  passwordHash?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  securityStamp?: string;
  twoFactorEnabled: boolean;
  userName?: string;
}
