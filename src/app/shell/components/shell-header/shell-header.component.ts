import { Component, OnInit } from '@angular/core';

import { NavigationListItem } from '../../../interfaces';

@Component({
  selector: 'app-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss'],
})
export class ShellHeaderComponent implements OnInit {
  navigationList: NavigationListItem[] = [];

  ngOnInit(): void {}
}
