import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUriProvider {
  private url = 'http://localhost:5000';

  getBaseUri(): string {
    return this.url;
  }

  getApiUri(): string {
    return this.url + '/api';
  }
}
