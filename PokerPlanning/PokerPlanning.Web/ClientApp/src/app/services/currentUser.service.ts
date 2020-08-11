import {Injectable, OnInit} from '@angular/core';
import {LogService} from './logging/log.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private log: LogService) {
  }

  private userRooms: Map<string, string> = new Map<string, string>();

  public assign(username: string, roomId: string): void {
    this.log.debug('Setting current user ' + username + ' to room ' + roomId);
    this.userRooms.set(username, roomId);
  }

  getCurrentUser(roomId: string) {
    for (const [key, value] of this.userRooms.entries()) {
      if (value === roomId) {
        return key;
      }
    }
    return  '';
  }
}
