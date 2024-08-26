export interface LoginData {
  username: string;
  password: string;
}

export interface UserConnectionData {
  id: number;
  username: string;
  isSameUser: boolean;
  hasPendingRequest: boolean;
  requestId: number;
  connectionId: number;
}
