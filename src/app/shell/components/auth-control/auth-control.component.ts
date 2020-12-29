import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser, UserRole } from 'src/app/interfaces';
import { locations } from '../../../shared/constants';

@Component({
  selector: 'app-auth-control',
  templateUrl: './auth-control.component.html',
  styleUrls: ['./auth-control.component.scss'],
})
export class AuthControlComponent implements OnInit {
  constructor() {}

  @Input() isAuthPage!: boolean | null;
  @Input() user!: IUser | null;
  @Input() userLoading!: boolean | null;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  userMenuState: 'closed' | 'open' = 'closed';

  toggleMenu(): void {
    this.userMenuState = this.userMenuState === 'closed' ? 'open' : 'closed';
  }

  get avatarImg(): string {
    return this.user?.img_path || 'assets/images/avatar-default-icon.png';
  }

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
