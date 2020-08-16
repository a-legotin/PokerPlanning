export enum UserRole {
  Undefined = -1,
  Owner = 0,
  Member = 1,
  Observer = 2
}

export class User {
  id: string;
  name: string;
  role: UserRole;

}

export function isOwner(): boolean {
  return this.role === UserRole.Owner;
}

