import { IUser, UserRole } from 'src/app/interfaces';

export const userStub: IUser = {
  role: UserRole.USER,
  img_path: '',
  name: 'John Doe',
  id: 'user_id',
  email: 'some@mail.com',
};
