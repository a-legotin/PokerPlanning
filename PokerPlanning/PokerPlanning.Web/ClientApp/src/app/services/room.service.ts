import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Room} from '../models/room';
import {LogService} from './logging/log.service';
import {NewRoomRequest} from '../models/newRoomRequest';
import {BaseUriProvider} from './baseUriProvider';
import {BaseService} from './baseService';
import {Card} from '../models/card';

@Injectable()
export class RoomService extends BaseService {
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

  createRoom(cards: Card[]): Observable<string> {
    const newRoomRequest = new NewRoomRequest();
    newRoomRequest.cards = cards;
    const body = JSON.stringify(newRoomRequest);
    const uri = this.uriProvider.getApiUri() + this.roomUrl;
    return this.http.post<string>(uri, newRoomRequest, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}

