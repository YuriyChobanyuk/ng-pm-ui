import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from './store/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(private store: Store) {}

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