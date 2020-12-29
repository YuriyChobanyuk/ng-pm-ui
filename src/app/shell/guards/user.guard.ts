import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { authSelectors } from '../store/auth';
import { map } from 'rxjs/operators';
import { UserRole } from '../../interfaces';
import { AppState } from '../store/rootState';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
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
