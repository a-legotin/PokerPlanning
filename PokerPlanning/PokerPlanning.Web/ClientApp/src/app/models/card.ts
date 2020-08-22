import * as uuid from 'uuid';

export class Card {
  constructor() {
    this.value = '';
    this.display = '';
    this.id = uuid.v4();
  }
    id: string;
    value: string;
    display: string;
}

