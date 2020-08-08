import {Component, OnInit} from '@angular/core';
import {HubConnection} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import {Router} from '@angular/router';
import {Room} from '../../models/room';
import {SignalrConnectionFactory} from "../../services/signalrConnectionFactory";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private connectionFactory: SignalrConnectionFactory) {
  }

  public username: string = null;

  ngOnInit() {
    this.connectionFactory.hubConnection.on('onRoomCreated', (data: Room) => {
      console.log(data.id);
      this.router.navigate(['/room', data.id]);
    });
  }


  public createPlanningRoom(): void {
    this.connectionFactory.hubConnection
      .invoke('createPlanningRoom', this.username)
      .catch(err => console.error(err));
  }
}
