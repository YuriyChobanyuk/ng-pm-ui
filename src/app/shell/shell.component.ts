import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { authActions, authSelectors } from './store/auth';
import { AppState } from './store/rootState';
import { routerSelectors } from './store/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  user$ = this.store.pipe(select(authSelectors.user));
  userLoading$: Observable<boolean> = this.store.pipe(
    select(authSelectors.loading),
  );
  isAuthPage$ = this.store.pipe(select(routerSelectors.isAuthPage));

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
