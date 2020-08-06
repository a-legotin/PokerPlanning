import {Component, OnInit} from '@angular/core';
import {HubConnection} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  constructor() {
  }

  public username: string = null;
  private _hubConnection: HubConnection;

  ngOnInit() {
    this.signalrConn();
  }

  signalrConn() {
    this._hubConnection = new signalR.HubConnectionBuilder().withUrl('http://localhost:5000/planning-room').build();
    this._hubConnection
      .start()
      .then(function () {
        console.log('Hub connected');
      }).catch(function (err) {
      return console.error(err.toString());
    });

    this._hubConnection.on('onRoomCreated', (data) => {
      console.log(data);
    });
  }

  public createPlanningRoom(): void {
    this._hubConnection
      .invoke('createPlanningRoom', this.username)
      .catch(err => console.error(err));
  }
}
