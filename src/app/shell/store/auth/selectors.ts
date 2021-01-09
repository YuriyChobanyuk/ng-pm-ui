import { AppState } from '../rootState';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './reducer';

export const getAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const user = createSelector(getAuthState, (auth) => auth.user);
export const loading = createSelector(getAuthState, (auth) => auth.loading);
export const error = createSelector(getAuthState, (auth) => auth.error);
export const refreshing = createSelector(
  getAuthState,
  (auth) => auth.refreshing,
);
