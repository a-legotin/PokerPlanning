import {User} from './user' ;

export class Room {
  id: string;
  users: User[];
}

export class NewRoomRequest {
  ownerName: string;
}
