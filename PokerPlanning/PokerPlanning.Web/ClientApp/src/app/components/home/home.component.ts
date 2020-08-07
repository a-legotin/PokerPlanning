import {Component, OnInit} from '@angular/core';
import {HubConnection} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import {Router} from '@angular/router';
import {Room} from '../../models/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  public username: string = null;
  private _hubConnection: HubConnection;

  ngOnInit() {
    this.signalrConn();
  }

  signalrConn() {
    this._hubConnection = new signalR.HubConnectionBuilder().withUrl('http://localhost:5000/hubs/planning-room').build();
    this._hubConnection
      .start()
      .then(function () {
        console.log('Hub connected');
      }).catch(function (err) {
      return console.error(err.toString());
    });

    this._hubConnection.on('onRoomCreated', (data: Room) => {
      console.log(data.id);
      this.router.navigate(['/room', data.id]);
    });
  }

  public createPlanningRoom(): void {
    this._hubConnection
      .invoke('createPlanningRoom', this.username)
      .catch(err => console.error(err));
  }
}
