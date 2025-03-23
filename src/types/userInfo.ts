export interface UserInfo {
  userName?: string;
  userPermission?: UserPermission;
}

export interface AccountInfo {
  account?: string;
  password?: UserPermission;
}

export enum UserPermission {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}
