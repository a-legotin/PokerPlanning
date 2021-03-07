import {HttpClient} from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from '@microsoft/signalr';
import {LogService} from './logging/log.service';
import {Injectable} from '@angular/core';
import {SignalRConnectionBase} from './signalRConnectionBase';

@Injectable()
export class SignalrConnectionFactory {
  public hubConnection: HubConnection;

  constructor(private http: HttpClient,
              private log: LogService) {
  }

  signalrConn(connection: SignalRConnectionBase): Promise<void> {
    const log = this.log;
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('' + connection.hubUrl).build();
    return this.hubConnection
      .start()
      .then(function () {
        log.debug('Hub connected');
      }).catch(function (err) {
      return log.error(err.toString());
    });
  }
}

