import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {LogService} from '../../../../services/logging/log.service';
import {Card} from '../../../../models/card';

@Component({
  selector: 'app-cards-setup',
  templateUrl: './cards.setup.component.html',
})

export class CardsSetupComponent implements OnInit {
  @Output() cardsEmitter = new EventEmitter<Card[]>();

  constructor(private log: LogService) {
  }

  cards: Card[];

  ngOnInit() {
    const firstCard = new Card();
    this.cards = [firstCard];
    this.cardsEmitter.emit(this.cards);
  }

  addNewCard() {
    const card = new Card();
    this.cards.push(card);
    this.cardsEmitter.emit(this.cards);
  }

  removeCard(id: string) {
    this.cards = this.cards.filter(item => item.id !== id);
    this.cardsEmitter.emit(this.cards);
  }
}
