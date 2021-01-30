import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthControlComponent } from './shell/components/auth-control/auth-control.component';
import { LoginComponent } from './shell/components/forms/login/login.component';
import { SignUpComponent } from './shell/components/forms/sign-up/sign-up.component';
import { ShellHeaderComponent } from './shell/components/shell-header/shell-header.component';
import { AuthComponent } from './shell/pages/auth/auth.component';
import { HomeComponent } from './shell/pages/home/home.component';
import { InterceptorService } from './shell/services/interceptor.service';
import { ShellComponent } from './shell/shell.component';
import { effects, reducers } from './shell/store/rootState';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomeComponent,
    AuthComponent,
    ShellHeaderComponent,
    AuthControlComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
