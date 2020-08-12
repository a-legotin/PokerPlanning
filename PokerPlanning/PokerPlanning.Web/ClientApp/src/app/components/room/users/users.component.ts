import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {User, UserRole} from '../../../models/user';

@Component({
  selector: 'app-room-users',
  templateUrl: './users.component.html',
})

export class RoomUsersComponent implements OnInit {
  @Input() users: User[];

  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
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
}
