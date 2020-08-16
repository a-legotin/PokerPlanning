import {Injectable} from '@angular/core';
import {LogService} from './logging/log.service';
import {User} from '../models/user';
import {UserRole} from "../models/userRole";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private log: LogService) {
  }

  private userRooms: Map<User, string> = new Map<User, string>();

  public assign(user: User, roomId: string): void {
    this.log.debug('Setting current user ' + user.name + ' to room ' + roomId);
    this.userRooms.set(user, roomId);
  }

  getCurrentUser(roomId: string): User {
    for (const [key, value] of this.userRooms.entries()) {
      if (value === roomId) {
        return key;
      }
    }
    const user = new User();
    user.role = UserRole.Undefined;
    user.id = '';
    return user;
  }
}
