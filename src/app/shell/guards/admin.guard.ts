import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/rootState';
import { authSelectors } from '../store/auth';
import { map } from 'rxjs/operators';
import { UserRole } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log({ route, state });
    return this.store.pipe(
      select(authSelectors.user),
      map((user) => {
        return user?.role === UserRole.ADMIN;
      }),
    );
  }
}
