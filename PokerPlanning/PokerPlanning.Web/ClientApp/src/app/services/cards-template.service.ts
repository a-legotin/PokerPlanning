import {Injectable} from '@angular/core';
import {BaseService} from './baseService';
import {HttpClient} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {BaseUriProvider} from './baseUriProvider';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CardTemplate} from '../models/cardTemplate';

@Injectable()
export class CardsTemplateService extends BaseService {

  private url = '/card/template';

  constructor(protected http: HttpClient,
              protected log: LogService,
              protected uriProvider: BaseUriProvider) {
    super(http, log, uriProvider);
  }

  getAllTemplates(): Observable<CardTemplate[]> {
    const url = `${this.uriProvider.getApiUri() + this.url}`;
    this.log.debug('Loading all templates');
    return this.http.get<CardTemplate[]>(url).pipe(catchError(this.handleError));
  }
}
