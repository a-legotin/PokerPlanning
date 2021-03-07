import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Room} from '../models/room';
import {LogService} from './logging/log.service';
import {NewRoomRequest} from '../models/newRoomRequest';
import {BaseUriProvider} from './baseUriProvider';
import {ServiceBase} from './serviceBase';
import {Card} from '../models/card';

@Injectable()
export class RoomService extends ServiceBase {
  private roomUrl = '/room';

  constructor(protected http: HttpClient,
              protected log: LogService,
              protected uriProvider: BaseUriProvider) {
    super(http, log, uriProvider);
  }

  getRoom(id: string): Observable<Room> {
    const url = `${this.uriProvider.getApiUri() + this.roomUrl}/${id}`;
    return this.http.get<Room>(url).pipe(catchError(this.handleError));
  }

  createRoom(ownername: string, cards: Card[]): Observable<Room> {
    const newRoomRequest = new NewRoomRequest();
    newRoomRequest.cards = cards;
    newRoomRequest.ownerName = ownername;
    const uri = this.uriProvider.getApiUri() + this.roomUrl;
    return this.http.post<Room>(uri, newRoomRequest, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}

