export interface Account {
  id: number;
  name: string;
  creationDate: Date;
  owner: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export interface Credential {
  email: string;
  password: string;
}
