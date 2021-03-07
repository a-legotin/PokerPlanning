import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMenuComponent } from '../components/login-menu/login-menu.component';
import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { RouterModule } from '@angular/router';
import { ApplicationPaths } from '../services/authorization/api-authorization.constants';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(
      [
        { path: ApplicationPaths.Register, component: LoginComponent },
        { path: ApplicationPaths.Profile, component: LoginComponent },
        { path: ApplicationPaths.Login, component: LoginComponent },
        { path: ApplicationPaths.LoginFailed, component: LoginComponent },
        { path: ApplicationPaths.LoginCallback, component: LoginComponent },
        { path: ApplicationPaths.LogOut, component: LogoutComponent },
        { path: ApplicationPaths.LoggedOut, component: LogoutComponent },
        { path: ApplicationPaths.LogOutCallback, component: LogoutComponent }
      ]
    )
  ],
  declarations: [LoginMenuComponent, LoginComponent, LogoutComponent],
  exports: [LoginMenuComponent, LoginComponent, LogoutComponent]
})
export class ApiAuthorizationModule { }
