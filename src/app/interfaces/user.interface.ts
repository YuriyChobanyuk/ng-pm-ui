export interface IUser {
  name: string;
  id: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  img_path?: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
