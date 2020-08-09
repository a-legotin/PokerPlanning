import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError, throwError as observableThrowError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {NewRoomRequest, Room} from '../models/room';

@Injectable()
export class RoomService {
  private REST_API_SERVER = 'http://localhost:5000/api';
  private roomUrl = '/room';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'jwt-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getRoom(id: string): Observable<Room> {
    const url = `${this.REST_API_SERVER + this.roomUrl}/${id}`;
    return this.http.get<Room>(url).pipe(catchError(this.handleError));
  }

  createRoom(username: string): Observable<string> {
    const newRoomRequest = new NewRoomRequest();
    newRoomRequest.ownerName = username;
    return this.http.post<string>(this.REST_API_SERVER + this.roomUrl, newRoomRequest, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        console.log(`Server error: ${error.error.message}`);
      } else {
        // Server-side errors
        console.log(`Error code: ${error.status}\nMessage: ${error.message}`);
      }
      return of(result as T);
    };
  }
}
