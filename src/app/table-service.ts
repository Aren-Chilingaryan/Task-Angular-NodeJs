import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, User, Credentials } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';
@Injectable({ providedIn: 'root' })
export class TableService {
  private AccountsUrl: string = environment.apiUrl;
  private UserDataUrl: string = environment.apiUrlUser;

  constructor(private http: HttpClient) {}

  formatDate(date: Date | null) {
    if (date) {
      const formattedDate = moment(date).lang('en').format('DD/MM/YYYY') as any;
      return formattedDate;
    } else {
      return null;
    }
  }

  async getAccount(id: string): Promise<Account> {
    const url = `${this.AccountsUrl}/${id}`;
    const data = await this.http.get<Account>(url).toPromise();
    data.creationDate = this.formatDate(data.creationDate);
    return data;
  }

  async getAccounts() {
    const data = await this.http.get<Account[]>(this.AccountsUrl).toPromise();
    data.forEach(
      (item) => (item.creationDate = this.formatDate(item.creationDate))
    );
    return data;
  }

  async addAccount(account: any) {
    const data = await this.http
      .post<Account>(this.AccountsUrl, account)
      .toPromise();
    data.creationDate = this.formatDate(account.creationDate);
    return data;
  }

  async addUser(user: User) {
    const data = await this.http.post(this.UserDataUrl, user).toPromise();
    return data;
  }

  async deleteAccount(id: string) {
    const data = await this.http
      .delete<Account>(`${this.AccountsUrl}/delete/${id}`)
      .toPromise();
    return data;
  }

  async getAuthorizedUser(credentials: Credentials) {
    const url = `${this.UserDataUrl}/authorized`;
    const data = await this.http.post<User>(url, credentials).toPromise();
    console.log(data);
    return data;
  }

  deleteItemFromArray(array: any, item: any) {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }
}
