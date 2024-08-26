export interface User {
    id: number;
    username: string;
    isSameUser: boolean;
    hasPendingRequest: boolean;
    requestId: number;
    connectionId: number;
  }
  