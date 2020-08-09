import {LogEntry} from './log.entry';

export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry);
  abstract clear();
}
