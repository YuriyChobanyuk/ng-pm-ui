import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { locations } from './shared/constants';
import { AdminGuard } from './shell/guards/admin.guard';
import { UserGuard } from './shell/guards/user.guard';
import { AuthComponent } from './shell/pages/auth/auth.component';
import { HomeComponent } from './shell/pages/home/home.component';

const routes: Routes = [
  {
    path: locations.HOME,
    component: HomeComponent,
  },
  {
    path: locations.AUTH,
    component: AuthComponent,
  },
  {
    path: locations.ADMIN,
    loadChildren: () => {
      return import('./admin/admin.module').then((m) => {
        return m.AdminModule;
      });
    },
    canActivate: [AdminGuard],
  },
  {
    path: locations.USER,
    loadChildren: () => {
      return import('./user/user.module').then((m) => {
        return m.UserModule;
      });
    },
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
