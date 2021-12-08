export interface Account {
  id: number;
  name: string;
  creationDate: Date;
  owner: string;
}

export interface Credentials{
  id: number;
  login: string;
  password: number;
}
