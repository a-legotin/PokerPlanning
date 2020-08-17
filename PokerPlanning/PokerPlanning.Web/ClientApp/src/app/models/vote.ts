import {Card} from './card';
import {User} from './user';

export class Vote {
    id: string;
    user: User;
    roundId: string;
    startedBy: string;
    card: Card;
}
