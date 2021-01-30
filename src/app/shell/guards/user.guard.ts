import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserRole } from '../../interfaces';
import { authSelectors } from '../store/auth';
import { AppState } from '../store/rootState';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(authSelectors.user),
      map((user) => {
        return user?.role === UserRole.USER || user?.role === UserRole.ADMIN;
      }),
    );
  }
}
