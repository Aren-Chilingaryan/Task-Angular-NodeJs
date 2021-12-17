import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';

@Injectable({ providedIn: 'root' })
export class TableService {
  accounts: Account[] = [];
  constructor(private http: HttpClient) {}

  async getAccount(id: string): Promise<Account> {
    const url = environment.apiUrl + '/' + id;
    const data = await this.http.get<Account>(url).toPromise();
    data.creationDate = moment(data.creationDate)
      .lang('en')
      .format(' DD/MM/YYYY') as any;
    return data;
  }

  async getAccounts() {
    const url = environment.apiUrl;
    const data = await this.http.get<Account[]>(url).toPromise();
    data.forEach(
      (item) =>
        (item.creationDate = moment(item.creationDate)
          .lang('en')
          .format(' DD/MM/YYYY') as any)
    );
    return data;
  }

  callServer(user:Account) {
    const url = environment.apiUrl;
    this.http.post(url, user)
    .subscribe(data => {
      console.log(data);
    });
  }
}
