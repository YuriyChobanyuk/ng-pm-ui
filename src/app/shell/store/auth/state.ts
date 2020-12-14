import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthResponse, IUser } from '../../../interfaces';
import { AuthActions } from './actions';
import { ApiService } from '../../services/api.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage.service';

export interface AuthStateModel {
  user: IUser | null;
  loading: boolean;
  error: boolean;
  refreshError: boolean;
  refreshLoading: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    loading: false,
    error: false,
    refreshError: false,
    refreshLoading: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private readonly _apiService: ApiService,
    private readonly _localStorageService: LocalStorageService,
  ) {}

  @Action(AuthActions.GetUser)
  getUser({ patchState }: StateContext<AuthStateModel>): Observable<any> {
    patchState({
      loading: true,
      user: null,
      error: false,
    });
    return this._apiService.getCurrentUser().pipe(
      tap((user: IUser) => {
        patchState({
          user,
          loading: false,
          error: false,
        });
      }),
      catchError((error) => {
        console.error(error);
        patchState({
          loading: false,
          error: true,
        });
        return of({});
      }),
    );
  }

  @Action(AuthActions.Login)
  login(
    ctx: StateContext<AuthStateModel>,
    action: AuthActions.Login,
  ): Observable<any> {
    this.setLoading(ctx);

    return this._apiService.login(action.payload).pipe(
      tap(this.getAuthResponseHandler(ctx)),
      catchError((error) => {
        console.error(error);
        this.setError(ctx);
        return of({});
      }),
    );
  }

  @Action(AuthActions.Refresh)
  refresh(ctx: StateContext<AuthStateModel>): Observable<any> {
    ctx.patchState({
      refreshLoading: true,
    });
    return this._apiService.refresh().pipe(
      tap(this.getAuthResponseHandler(ctx)),
      catchError((error) => {
        console.error(error);
        ctx.patchState({
          refreshLoading: false,
          refreshError: true,
        });
        return of({});
      }),
    );
  }

  private getAuthResponseHandler = (ctx: StateContext<AuthStateModel>) => {
    return ({ data: { user }, token }: AuthResponse) => {
      this.setUserData(ctx, user);
      this._localStorageService.setAccessToken(token);
    };
  };

  private setUserData = (
    ctx: StateContext<AuthStateModel>,
    user: IUser,
  ): void => {
    ctx.patchState({
      user,
      loading: false,
      error: false,
    });
  };

  private setLoading = (ctx: StateContext<AuthStateModel>) => {
    ctx.patchState({
      loading: true,
    });
  };

  private setError = (ctx: StateContext<AuthStateModel>) => {
    ctx.patchState({
      loading: false,
      error: true,
    });
  };
}
