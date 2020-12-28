import { Component, Input, OnInit } from '@angular/core';
import { NavigationListItem } from '../../../interfaces';

@Component({
  selector: 'app-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss'],
})
export class ShellHeaderComponent implements OnInit {
  constructor() {}

  navigationList: NavigationListItem[] = [];

  ngOnInit(): void {}
}
