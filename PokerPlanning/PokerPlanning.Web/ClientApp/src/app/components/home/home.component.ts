import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {CurrentUserService} from '../../services/currentUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {

  constructor(private router: Router,
              private roomService: RoomService,
              private currentUserService: CurrentUserService) {
  }

  public username: string = null;

  public createPlanningRoom(): void {
    this.roomService.createRoom()
      .subscribe(value => {
        this.currentUserService.assign(this.username, value);
        this.router.navigate(['/room', value]);
      });
  }
}
