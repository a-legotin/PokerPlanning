
export class LogEntry {
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;


  buildLogString(): string {
    let val = '';

    if (this.logWithDate) {
      val = new Date() + ' - ';
    }
    val += 'Type: ' + LogLevel[this.level];
    val += '- Message: ';
    if (this.extraInfo.length) {
      val += ' - Extra Info: '
        + this.formatParams(this.extraInfo);
    }

    return val;
  }


  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    if (params.some(p => typeof p === 'object')) {
      ret = '';
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}
