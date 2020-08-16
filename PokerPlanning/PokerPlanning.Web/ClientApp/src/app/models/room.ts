import {User} from './user';
import {Card} from './card';
import {CardSet} from './cardSet';

export class Room {
  public id: string;
  public users: User[];
  public cards: CardSet;
}


