/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  error: Error | any;
}
