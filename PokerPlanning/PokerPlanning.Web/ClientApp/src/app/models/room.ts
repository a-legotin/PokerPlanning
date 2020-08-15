import {User} from './user';
import {Card} from './card';

export class Room {
  public id: string;
  public users: User[];
  public cards: Card[];
}


