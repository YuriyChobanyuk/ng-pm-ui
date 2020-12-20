import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserSuccess,
  login,
  loginError,
  loginSuccess,
} from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { LoginCredentials } from '../../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login.type),
      mergeMap(({ credentials }: { credentials: LoginCredentials }) =>
        this.apiService.login(credentials).pipe(
          map(({ token, data: { user } }) => {
            this.localStorageService.setAccessToken(token);
            return loginSuccess({ user });
          }),
          catchError(() => of(loginError())),
        ),
      ),
    ),
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUser.type),
      mergeMap(() =>
        this.apiService.getCurrentUser().pipe(
          map((user) => getCurrentUserSuccess({ user })),
          catchError(() => of(getCurrentUserError())),
        ),
      ),
    ),
  );
}
