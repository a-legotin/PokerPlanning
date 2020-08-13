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
  isJoining: boolean;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private connectionFactory: SignalrConnectionFactory,
              private log: LogService,
              private currentUserService: CurrentUserService,
              private uriProvider: BaseUriProvider) {
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    const currentUserName = this.currentUserService.getCurrentUser(roomId);
    this.isJoining = currentUserName !== '';
    this.roomService.getRoom(roomId).subscribe(room => {
      this.room = room;
    });
    const connectionFactory = this.connectionFactory;
    this.connectionFactory.signalrConn()
      .then(() => {
        connectionFactory.hubConnection.on('onConnected', (user, room) => {
          this.currentUser = user;
          this.room = room;
          this.isJoining = false;
        });

        connectionFactory.hubConnection.on('onUsersChanged', (users) => {
          this.room.users = users;
        });

        connectionFactory.hubConnection.on('onUserDisconnected', (users) => {
          this.room.users = users;
        });
        if (!this.isJoining) {
          return;
        }
        this.connectionFactory.hubConnection.invoke('join', roomId, currentUserName, UserRole.Owner);
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
}
