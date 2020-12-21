import { authReducer, AuthState, AuthEffects } from './auth';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export const reducers = {
  auth: authReducer,
  router: routerReducer,
};

export const effects = [AuthEffects];

export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
}
