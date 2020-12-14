import { Selector } from '@ngxs/store';
import { IUser } from 'src/app/interfaces';
import { AuthState, AuthStateModel } from './state';

export class AuthSelector {
  @Selector([AuthState])
  static user(state: AuthStateModel): IUser | null {
    return state.user;
  }

  @Selector([AuthState])
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector([AuthState])
  static error(state: AuthStateModel): boolean {
    return state.error;
  }

  @Selector([AuthState])
  static refresh(state: AuthStateModel): { error: boolean; loading: boolean } {
    return {
      error: state.refreshError,
      loading: state.refreshLoading,
    };
  }
}
