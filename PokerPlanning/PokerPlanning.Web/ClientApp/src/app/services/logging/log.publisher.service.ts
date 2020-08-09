import { Injectable } from '@angular/core';
import {LogPublisher} from './log.publisher';
import {LogConsole} from './log.console';


@Injectable()
export class LogPublishersService {
  constructor() {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
  }
}
