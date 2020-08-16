import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {SignalrConnectionFactory} from '../../services/signalrConnectionFactory';
import {LogService} from '../../services/logging/log.service';
import {User, UserRole} from '../../models/user';
import {CurrentUserService} from '../../services/currentUser.service';
import {BaseUriProvider} from '../../services/baseUriProvider';

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
              private currentUserService: CurrentUserService,
              private uriProvider: BaseUriProvider) {
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(roomId).subscribe(room => {
      this.room = room;
      this.currentUser = this.currentUserService.getCurrentUser(this.room.id);
      this.log.debug('Loading room ' + this.room.id + ' with user ' + this.currentUser.name + ' [' + this.currentUser.role + ']');
      const connectionFactory = this.connectionFactory;
      this.connectionFactory.signalrConn()
        .then(() => {
          connectionFactory.hubConnection.on('onJoined', (user) => {
            this.currentUser = user;
          });

          connectionFactory.hubConnection.on('onUsersChanged', (users) => {
            this.room.users = users;
          });

          connectionFactory.hubConnection.on('onUserDisconnected', (users) => {
            this.room.users = users;
          });
          if (this.currentUser.id === '') {
            return;
          }
          this.connectionFactory.hubConnection.invoke('join', roomId, this.currentUser.name, UserRole.Owner);
        });
    });
  }

  public joinPlanningRoom(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.log.debug('Member ' + this.joiningUsername + ' joining room ' + roomId);
    this.connectionFactory.hubConnection.invoke('join', roomId, this.joiningUsername, UserRole.Member);
  }

  public observePlanningRoom(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.log.debug('Observer ' + this.joiningUsername + ' joining room ' + roomId);
    this.connectionFactory.hubConnection.invoke('join', roomId, this.joiningUsername, UserRole.Observer);
  }

  copyRoomLinkClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.uriProvider.getBaseUri() + '/room/' + this.room.id);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  isCurrentUserUndefined(): boolean {
    return this.currentUser.id === '' && this.currentUser.role === UserRole.Undefined;
  }

  isCurrentUserOwner(): boolean {
    return this.currentUser.id !== '' && this.currentUser.role === UserRole.Owner;
  }
}
