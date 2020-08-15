import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RoomService} from './services/room.service';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {HomeComponent} from './components/home/home.component';
import {RoomComponent} from './components/room/room.component';
import {TableComponent} from './components/room/table/table.component';
import {RoomUsersComponent} from './components/room/users/users.component';
import {SignalrConnectionFactory} from './services/signalrConnectionFactory';
import {BaseUriProvider} from './services/baseUriProvider';
import {LogService} from './services/logging/log.service';
import {LogPublishersService} from './services/logging/log.publisher.service';
import {CurrentUserService} from './services/currentUser.service';
import {CardsTemplateService} from './services/cards-template.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardsTemplatesComponent} from './components/cards/templates/cards.templates.component';
import {CardsComponent} from './components/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RoomComponent,
    TableComponent,
    RoomUsersComponent,
    CardsTemplatesComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'room/:id', component: RoomComponent},
    ]),
    NgbModule
  ],
  providers: [RoomService, SignalrConnectionFactory, BaseUriProvider, LogService, LogPublishersService, CurrentUserService, CardsTemplateService, CardsTemplatesComponent, CardsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
