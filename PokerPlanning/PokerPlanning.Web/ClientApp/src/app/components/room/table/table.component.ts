import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {Room} from '../../../models/room';

@Component({
  selector: 'app-room-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit {
  @Input() room: Room;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
  }
}
