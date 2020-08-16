import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card';
import {LogService} from '../../services/logging/log.service';
import {CardSet} from '../../models/cardSet';


@Component({
  selector: 'app-cards',
  styleUrls: ['./cards.component.css'],
  templateUrl: './cards.component.html',
})

export class CardsComponent implements OnInit {
  @Input() cards: CardSet;
  private votedCard: Card;

  constructor(private log: LogService) {
  }

  ngOnInit(): void {

  }

  vote(card: Card) {
    this.votedCard = card;
    this.log.debug('Voted:' + this.votedCard.display);
  }
}
