import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authActions, authSelectors } from './store/auth';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { AppState } from './store/rootState';
import { routerSelectors } from './store/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  user$ = this.store.pipe(select(authSelectors.user));
  isAuthPage$ = this.store.pipe(select(routerSelectors.isAuthPage));

  public navigationList = [
    {
      label: 'home',
      link: '',
    },
    {
      label: 'about',
      link: 'about',
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
