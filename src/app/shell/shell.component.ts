import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authActions, authSelectors } from './store/auth';
import { AppState } from './store/rootState';
import { routerSelectors } from './store/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  user$ = this.store.pipe(select(authSelectors.user));
  isAuthPage$ = this.store.pipe(select(routerSelectors.isAuthPage));

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
