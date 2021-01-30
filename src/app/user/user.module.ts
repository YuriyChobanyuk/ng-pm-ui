import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Route[] = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
