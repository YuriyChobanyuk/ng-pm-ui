import { AppState } from '../rootState';
import { createSelector } from '@ngrx/store';

export const getAuthState = (state: AppState) => state.auth;

export const user = createSelector(getAuthState, (auth) => auth.user);
export const loading = createSelector(getAuthState, (auth) => auth.loading);
export const error = createSelector(getAuthState, (auth) => auth.error);
