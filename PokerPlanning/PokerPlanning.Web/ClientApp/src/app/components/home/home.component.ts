import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {CurrentUserService} from '../../services/currentUser.service';
import {CardsTemplateService} from '../../services/cards-template.service';
import {CardTemplate} from '../../models/cardTemplate';
import {LogService} from '../../services/logging/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {

  constructor(private router: Router,
              private log: LogService,
              private roomService: RoomService,
              private templatesService: CardsTemplateService,
              private currentUserService: CurrentUserService) {
    this.getAllTemplates();
  }

  public username: string = null;
  public cardTemplates: CardTemplate[];
  public currentTemplate: CardTemplate;

  public createPlanningRoom(): void {
    this.roomService.createRoom(this.currentTemplate.cards)
      .subscribe(value => {
        this.currentUserService.assign(this.username, value);
        this.router.navigate(['/room', value]);
      });
  }

  onChanged(template: CardTemplate) {
    this.currentTemplate = template;
    this.log.debug(this.currentTemplate.id);
  }

  public getAllTemplates(): void {
    this.templatesService.getAllTemplates()
      .subscribe(res => {
        this.cardTemplates = res;
        this.log.debug('Loaded ' + res.length + ' templates');
      });
  }
}
