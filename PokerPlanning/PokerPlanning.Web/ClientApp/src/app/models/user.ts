export enum UserRole {
  Owner = 0,
  Member = 1,
  Observer = 2
}

export class User {
  id: string;
  name: string;
  role: UserRole;
}
