import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../rootState';
import { AuthState } from './reducer';

export const getAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const user = createSelector(getAuthState, (auth) => {return auth.user; });
export const loading = createSelector(getAuthState, (auth) => {return auth.loading; });
export const error = createSelector(getAuthState, (auth) => {return auth.error; });
export const refreshing = createSelector(
  getAuthState,
  (auth) => {return auth.refreshing; },
);
