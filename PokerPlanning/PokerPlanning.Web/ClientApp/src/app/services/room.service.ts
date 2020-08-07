import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Room } from '../models/room';

@Injectable()
export class RoomService {
  private roomUrl = 'api/room';

  constructor(private http: HttpClient) {}

  getRoom(id: string): Observable<Room> {
    const url = `${this.roomUrl}/${id}`;
    return this.http.get<Room>(url).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
