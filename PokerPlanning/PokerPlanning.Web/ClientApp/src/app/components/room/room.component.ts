import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {SignalrConnectionFactory} from '../../services/signalrConnectionFactory';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})

export class RoomComponent implements OnInit {
  room: Room;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private connectionFactory: SignalrConnectionFactory) {
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    console.log(roomId);
    this.roomService.getRoom(roomId).subscribe(room => (this.room = room));
  }
}
