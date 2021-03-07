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
import {CardsTemplatesComponent} from "./components/room/cards/templates/cards.templates.component";
import {CardsComponent} from "./components/room/cards/cards.component";
import {CardsSetupComponent} from "./components/room/cards/setup/cards.setup.component";
import {VotesComponent} from "./components/room/votes/votes.component";
import {TableComponent} from "./components/room/table/table.component";
import {RoomUsersComponent} from "./components/room/users/users.component";
import {RoomComponent} from "./components/room/room.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    RoomComponent,
    TableComponent,
    RoomUsersComponent,
    CardsTemplatesComponent,
    CardsComponent,
    VotesComponent,
    CardsSetupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      { path: 'room/:id', component: RoomComponent }
    ]),
    NgbModule
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
    CardsTemplatesComponent,
    CardsComponent,
    VotesComponent,
    CardsSetupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
