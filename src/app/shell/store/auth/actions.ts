import { createAction, props } from '@ngrx/store';
import { IUser, LoginCredentials } from '../../../interfaces';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>(),
);

export const loginError = createAction('[Auth] Login Error');

export const getCurrentUser = createAction('[Auth] Get Current User');

export const getCurrentUserSuccess = createAction(
  '[Auth] Get Current User Success',
  props<{ user: IUser }>(),
);

export const getCurrentUserError = createAction(
  '[Auth] Get Current User Error',
);

export const logout = createAction('[Auth] Logout');
