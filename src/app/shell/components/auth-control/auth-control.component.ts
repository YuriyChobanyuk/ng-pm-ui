import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces';

import { DEFAULT_AVATAR_PATH, locations } from '../../../shared/constants';

@Component({
  selector: 'app-auth-control',
  templateUrl: './auth-control.component.html',
  styleUrls: ['./auth-control.component.scss'],
})
export class AuthControlComponent implements OnInit {
  @Input() isAuthPage = false;
  @Input() user: IUser | null = null;
  @Input() userLoading = false;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  defaultAvatarImg = DEFAULT_AVATAR_PATH;

  get authPath(): string {
    return locations.AUTH;
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  ngOnInit(): void {}

  handleLogout(): void {
    this.logout.emit();
  }
}
