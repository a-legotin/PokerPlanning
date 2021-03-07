import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {Card} from '../../../models/card';
import {LogService} from '../../../services/logging/log.service';
import {HubConnection} from '@microsoft/signalr';
import {PlanningRound} from '../../../models/planningRound';
import {User} from '../../../models/user';


@Component({
  selector: 'app-cards',
  styleUrls: ['./cards.component.css'],
  templateUrl: './cards.component.html',
})

export class CardsComponent implements OnChanges {
  @Input() cards: Card[];
  @Input() roundHub: HubConnection;
  @Input() currentRound: PlanningRound;
  @Input() currentUser: User;

  private votedCard: Card;

  constructor(private log: LogService,
              private el: ElementRef) {
  }

  ngOnChanges(changes) {
    if (changes['roundHub'] && this.roundHub) {
      this.roundHub.on('onNewRoundStarted', (round) => {
        this.votedCard = null;
        this.el.nativeElement.querySelectorAll('.active').forEach(
          question => {
            question.classList.remove('active');
          });
      });
    }
  }

  vote(card: Card) {
    this.votedCard = card;
    this.roundHub.invoke('vote', this.currentRound, this.currentUser, this.votedCard);
    this.log.debug('Voted:' + this.votedCard.display + ' by ' + this.currentUser.id + ' in round ' + this.currentRound.id);
  }
}
