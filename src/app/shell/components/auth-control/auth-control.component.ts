import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { locations } from '../../../shared/constants';

@Component({
  selector: 'app-auth-control',
  templateUrl: './auth-control.component.html',
  styleUrls: ['./auth-control.component.scss'],
})
export class AuthControlComponent implements OnInit {
  constructor() {}

  @Input() isAuthPage!: boolean;
  @Input() user!: IUser | null;
  authPath = locations.AUTH;

  ngOnInit(): void {}
}
