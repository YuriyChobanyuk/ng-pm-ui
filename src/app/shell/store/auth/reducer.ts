import { IUser } from '../../../interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  signUp,
  signUpError,
  signUpSuccess,
} from './actions';

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, signUp, getCurrentUser, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loginSuccess, signUpSuccess, getCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false,
  })),
  on(loginError, signUpError, getCurrentUserError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    error: false,
    loading: false,
  })),
);
