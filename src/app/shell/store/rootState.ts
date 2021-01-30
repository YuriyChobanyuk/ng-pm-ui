import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { AuthEffects, authReducer, AuthState } from './auth';

export const reducers = {
  auth: authReducer,
  router: routerReducer,
};

export const effects = [AuthEffects];

export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
}
