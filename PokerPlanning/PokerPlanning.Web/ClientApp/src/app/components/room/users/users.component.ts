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

  ngOnInit(): void {
  }
}
