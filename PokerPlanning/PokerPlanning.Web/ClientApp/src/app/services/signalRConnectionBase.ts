export class SignalRConnectionBase {
    constructor(public hubUrl: string) {
    }
}

export class SignalRConnectionRoom extends SignalRConnectionBase {
  constructor() {
    super('/hubs/planning-room');
  }
}

export class SignalRConnectionRound extends SignalRConnectionBase {
  constructor() {
    super('hubs/planning-room/round');
  }
}
