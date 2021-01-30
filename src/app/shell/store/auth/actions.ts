import { createAction, props } from '@ngrx/store';

import {
  IUser,
  LoginCredentials,
  SignUpCredentials,
} from '../../../interfaces';

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

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ credentials: SignUpCredentials }>(),
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: IUser }>(),
);

export const signUpError = createAction('[Auth] Sign Up Error');

export const refresh = createAction('[Auth] Refresh');
export const refreshSuccess = createAction('[Auth] Refresh Success');
export const refreshError = createAction('[Auth] Refresh Error');
