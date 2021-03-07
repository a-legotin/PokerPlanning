import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/app/modules/api-authorization.module';
import { AuthorizeGuard } from 'src/app/guards/authorize.guard';
import { AuthorizeInterceptor } from 'src/app/interceptors/authorize.interceptor';
import {RoomService} from "./services/room.service";
import {SignalrConnectionFactory} from "./services/signalrConnectionFactory";
import {BaseUriProvider} from "./services/baseUriProvider";
import {LogService} from "./services/logging/log.service";
import {LogPublishersService} from "./services/logging/log.publisher.service";
import {CurrentUserService} from "./services/currentUser.service";
import {CardsTemplateService} from "./services/cards-template.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    RoomService,
    SignalrConnectionFactory,
    BaseUriProvider,
    LogService,
    LogPublishersService,
    CurrentUserService,
    CardsTemplateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
