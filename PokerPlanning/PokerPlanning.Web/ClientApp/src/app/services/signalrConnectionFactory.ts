import {HttpClient} from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from '@microsoft/signalr';
import {LogService} from './logging/log.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SignalrConnectionFactory {
  private url = '/hubs/planning-room';
  public hubConnection: HubConnection;

  constructor(private http: HttpClient,
              private log: LogService) {
  }

  signalrConn(): Promise<void> {
    const log = this.log;
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('' + this.url).build();
    return this.hubConnection
      .start()
      .then(function () {
        log.debug('Hub connected');
      }).catch(function (err) {
      return console.error(err.toString());
    });
  }
}

