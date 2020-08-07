import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {Room} from '../../../models/room';

@Component({
  selector: 'app-room-users',
  templateUrl: './users.component.html',
})

export class RoomUsersComponent implements OnInit {
  @Input() room: Room;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {
  }
  id: string;

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    console.log(roomId);
    this.roomService.getRoom(roomId).subscribe(room => (this.room = room));
  }
}
