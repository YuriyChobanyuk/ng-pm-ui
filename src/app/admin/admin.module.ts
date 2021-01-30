import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Route[] = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
