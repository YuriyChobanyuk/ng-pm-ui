import {authReducer, AuthState, authActions, AuthEffects} from './auth';

export const reducers = {
  auth: authReducer,
};

export const effects = [AuthEffects];

export interface AppState {
  auth: AuthState;
}
