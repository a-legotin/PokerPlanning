import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrConnectionFactory {
  private url = '/hubs/planning-room';
  public hubConnection: HubConnection;

  constructor(private http: HttpClient) {
    this.signalrConn();
  }

  signalrConn() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('' + this.url).build();
    this.hubConnection
      .start()
      .then(function () {
        console.log('Hub connected');
      }).catch(function (err) {
      return console.error(err.toString());
    });
  }
}

