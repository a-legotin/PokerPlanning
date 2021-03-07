import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../models/room';
import {User} from '../../../models/user';
import {HubConnection} from '@microsoft/signalr';
import {LogService} from '../../../services/logging/log.service';
import {PlanningRound} from '../../../models/planningRound';
import {Vote} from '../../../models/vote';
import {Timespan} from '../../../models/TimeSpan';

@Component({
  selector: 'app-room-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnChanges {
  @Input() room: Room;
  @Input() currentUser: User;
  @Input() roundHub: HubConnection;
  currentRound: PlanningRound;
  allVotes: Vote[];
  currentRoundSpan: Timespan;

  constructor(private route: ActivatedRoute,
              private log: LogService) {
  }

  ngOnChanges(changes) {
    if (changes['roundHub'] && this.roundHub) {
      this.roundHub.on('onNewRoundStarted', (round) => {
        this.currentRound = round;
        this.allVotes = null;
      });
      this.roundHub.on('onVotesShown', (votes) => {
        this.allVotes = votes;
      });
      this.roundHub.on('onRoundTimerTick', (timespan) => {
        if (!this.currentRoundSpan) {
          this.currentRoundSpan = timespan;
        }
        if (!this.currentRoundSpan.hours !== timespan.hours) {
          this.currentRoundSpan.hours = timespan.hours;
        }

        if (!this.currentRoundSpan.minutes !== timespan.minutes) {
          this.currentRoundSpan.minutes = timespan.minutes;
        }

        if (!this.currentRoundSpan.seconds !== timespan.seconds) {
          this.currentRoundSpan.seconds = timespan.seconds;
        }
      });
      this.spinNextRound();
    }
  }

  showAllVotes() {
    this.log.debug('Showing votes');
    this.roundHub.invoke('showAllVotes', this.currentRound.id);
  }

  spinNextRound() {
    this.log.debug('Spinning new round');
    this.roundHub.invoke('newRound', this.room.id, this.currentUser.id);
  }

  getDisplayTimer(): string {
    let hours  = '00';
    let minutes  = '00';
    let seconds = '00';

    if (Number(this.currentRoundSpan.hours) < 10) {
      hours = '0' + this.currentRoundSpan.hours;
    } else {
      hours = '' + hours;
    }
    if (Number(this.currentRoundSpan.minutes) < 10) {
      minutes = '0' + this.currentRoundSpan.minutes;
    } else {
      minutes = '' + this.currentRoundSpan.minutes;
    }
    if (Number(this.currentRoundSpan.seconds) < 10) {
      seconds = '0' + this.currentRoundSpan.seconds;
    } else {
      seconds = '' + this.currentRoundSpan.seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
}
