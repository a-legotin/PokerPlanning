import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {BaseUriProvider} from './baseUriProvider';
import {Observable, of} from 'rxjs';

export class BaseService {
  constructor(protected http: HttpClient,
              protected log: LogService,
              protected uriProvider: BaseUriProvider) {
  }


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'jwt-token'
    })
  };

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        this.log.debug(`Server error: ${error.error.message}`);
      } else {
        // Server-side errors
        this.log.debug(`Error code: ${error.status}\nMessage: ${error.message}`);
      }
      return of(result as T);
    };
  }
}
