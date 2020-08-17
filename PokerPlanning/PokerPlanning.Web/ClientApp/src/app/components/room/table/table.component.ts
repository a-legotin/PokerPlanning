import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../models/room';
import {User} from '../../../models/user';
import {HubConnection} from '@microsoft/signalr';
import {LogService} from '../../../services/logging/log.service';
import {PlanningRound} from '../../../models/planningRound';
import {Vote} from '../../../models/vote';

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
}
