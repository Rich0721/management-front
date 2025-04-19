export interface UserInfo {
  username?: string;
  password?: string;
  userPermission?: UserPermission;
  clientId?: string;
}

export enum UserPermission {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}
