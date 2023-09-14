export interface IUser {
  username: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser,
  token: string
}