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
  on(login, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false,
  })),
  on(loginError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(getCurrentUser, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(getCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false,
  })),
  on(getCurrentUserError, (state) => ({
    ...state,
    user: null,
    error: true,
    loading: false,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    error: false,
    loading: false,
  })),
);
