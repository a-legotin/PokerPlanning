import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {SignalrConnectionFactory} from '../../services/signalrConnectionFactory';
import {LogService} from '../../services/logging/log.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})

export class RoomComponent implements OnInit {
  room: Room;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private connectionFactory: SignalrConnectionFactory,
              private log: LogService) {
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.log.debug(roomId);
    this.roomService.getRoom(roomId).subscribe(room => (this.room = room));
  }
}
