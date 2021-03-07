import {Vote} from './vote';

export class PlanningRound {
    id: string;
    roomId: string;
    startedBy: string;
    votes: Vote[];
}
