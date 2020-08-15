import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {BaseUriProvider} from './baseUriProvider';
import {EMPTY} from 'rxjs';

export class BaseService {
  constructor(protected http: HttpClient,
              protected log: LogService,
              protected uriProvider: BaseUriProvider) {
  }


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return EMPTY;
  }
}
