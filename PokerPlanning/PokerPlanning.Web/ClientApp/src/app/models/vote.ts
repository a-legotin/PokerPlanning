import {Card} from './card';

export class Vote {
    id: string;
    userId: string;
    roundId: string;
    startedBy: string;
    card: Card;
}
