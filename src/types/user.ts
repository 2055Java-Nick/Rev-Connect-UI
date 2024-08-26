export interface LoginData {
  username: string;
  password: string;
}

export type FormData = {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  email?: string;
  accounttype?: boolean; //changed to boolean to match backend
  remember?: string;
};