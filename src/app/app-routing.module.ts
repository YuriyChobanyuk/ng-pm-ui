import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shell/pages/home/home.component';
import { AuthComponent } from './shell/pages/auth/auth.component';
import { locations } from './shared/constants';
import { AdminGuard } from './shell/guards/admin.guard';
import { UserGuard } from './shell/guards/user.guard';

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
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: locations.USER,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
