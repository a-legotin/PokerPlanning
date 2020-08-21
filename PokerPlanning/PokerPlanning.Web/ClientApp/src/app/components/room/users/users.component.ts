import {Component, Input, OnChanges} from '@angular/core';
import {RoomService} from '../../../services/room.service';
import {User} from '../../../models/user';
import {HubConnection} from '@microsoft/signalr';
import {UserRole} from '../../../models/userRole';
import {Vote} from '../../../models/vote';
import {LogService} from '../../../services/logging/log.service';

@Component({
  selector: 'app-room-users',
  templateUrl: './users.component.html',
})

export class RoomUsersComponent implements OnChanges {
  @Input() users: User[];
  @Input() roundHub: HubConnection;
  @Input() userVotes: Vote[];

  constructor(private log: LogService,
              private roomService: RoomService) {
  }

  ngOnChanges(changes) {
    if (changes['roundHub'] && this.roundHub) {
      this.userVotes = [];
      this.roundHub.on('onUserVoted', (vote) => {
        this.userVotes.push(vote);
      });

      this.roundHub.on('onNewRoundStarted', (round) => {
        this.userVotes = [];
      });
    }
  }

  isOwner(user: User) {
    return user.role === UserRole.Owner;
  }

  isMember(user: User) {
    return user.role === UserRole.Member;
  }

  isObserver(user: User) {
    return user.role === UserRole.Observer;
  }

  isUserVoted(user: User): boolean {
    return this.userVotes
      && this.userVotes.length > 0
      && this.userVotes.findIndex(value => value.user.id === user.id) > -1;
  }
}
