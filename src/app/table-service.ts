import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, User, Credential } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';

const signupUrl = '/auth/signup';
const signinUrl = '/auth/signin';
const accountsUrl = '/accounts';
@Injectable({ providedIn: 'root' })
export class TableService {
  private apiurl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  formatDate(date: Date) {
    const formattedDate = moment(date).lang('en').format('DD/MM/YYYY') as any;
    return formattedDate;
  }

  async getAccount(id: string): Promise<Account> {
    const url = accountsUrl + id;
    const data = await this.http.get<Account>(url).toPromise();
    data.creationDate = this.formatDate(data.creationDate);
    return data;
  }

  async getAccounts() {
    const url = this.apiurl + accountsUrl;
    const data = await this.http.get<Account[]>(url).toPromise();
    data.forEach(
      (item) => (item.creationDate = this.formatDate(item.creationDate))
    );
    return data;
  }

  async addAccount(account: any) {
    const url = this.apiurl + accountsUrl;
    const data = await this.http.post<Account>(url, account).toPromise();
    data.creationDate = this.formatDate(account.creationDate);
    return data;
  }

  async addUser(user: User) {
    const url = this.apiurl + signupUrl;
    const data = await this.http.post(url, user).toPromise();
    return data;
  }

  async deleteAccount(id: string) {
    const url = `${this.apiurl + accountsUrl}/delete/${id}`;
    const data = await this.http.delete<Account>(url).toPromise();
    return data;
  }

  async getAuthorizedUser(credentials: Credential) {
    const url = this.apiurl + signinUrl;
    const data = await this.http.post<User>(url, credentials).toPromise();
    return data;
  }
}
