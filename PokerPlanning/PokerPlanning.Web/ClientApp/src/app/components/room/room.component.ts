import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {SignalrConnectionFactory} from '../../services/signalrConnectionFactory';
import {LogService} from '../../services/logging/log.service';
import {User} from '../../models/user';
import {CurrentUserService} from '../../services/currentUser.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})

export class RoomComponent implements OnInit {
  room: Room;
  currentUser: User;
  joiningUsername: string;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private connectionFactory: SignalrConnectionFactory,
              private log: LogService,
              private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.log.debug(roomId);
    this.roomService.getRoom(roomId).subscribe(room => {
      this.room = room;
      const currentUserName = this.currentUserService.getCurrentUser(room.id);
      this.currentUser = room.users.find(user => user.name === currentUserName);
      this.log.debug('Current user: ' + this.currentUser.name);
    });
  }

  public joinPlanningRoom(): void {
    this.log.debug('User ' + this.joiningUsername + ' joining');
  }
}
