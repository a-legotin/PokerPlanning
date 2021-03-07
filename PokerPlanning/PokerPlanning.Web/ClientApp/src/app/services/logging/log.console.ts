import {LogEntry} from './log.entry';
import {LogPublisher} from './log.publisher';

export class LogConsole extends LogPublisher {
  log(entry: LogEntry) {
    console.log(entry.buildLogString());
  }

  clear() {
    console.clear();
  }
}
