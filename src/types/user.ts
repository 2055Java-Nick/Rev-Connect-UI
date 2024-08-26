export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  isSameUser: boolean;
  hasPendingRequest: boolean;
}
