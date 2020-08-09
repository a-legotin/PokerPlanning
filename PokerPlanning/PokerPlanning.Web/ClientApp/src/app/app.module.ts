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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RoomComponent,
    TableComponent,
    RoomUsersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'room/:id', component: RoomComponent},
    ])
  ],
  providers: [RoomService, SignalrConnectionFactory, BaseUriProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
