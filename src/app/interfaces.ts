export interface Account {
  id: number;
  name: string;
  creationDate: Date | null;
  owner: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}
