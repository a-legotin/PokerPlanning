import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {

  constructor(private router: Router,
              private roomService: RoomService) {
  }

  public username: string = null;

  public createPlanningRoom(): void {
    this.roomService.createRoom(this.username)
      .subscribe(value => {
        this.router.navigate(['/room', value]);
      });
  }
}
