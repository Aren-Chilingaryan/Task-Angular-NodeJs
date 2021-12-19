import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';

@Injectable({ providedIn: 'root' })
export class TableService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getAccount(id: string): Promise<Account> {
    const url = this.url + '/' + id;
    const data = await this.http.get<Account>(url).toPromise();
    data.creationDate = moment(data.creationDate)
      .lang('en')
      .format(' DD/MM/YYYY') as any;
    return data;
  }

  async getAccounts() {
    const data = await this.http.get<Account[]>(this.url).toPromise();
    data.forEach(
      (item) =>
        (item.creationDate = moment(item.creationDate)
          .lang('en')
          .format(' DD/MM/YYYY') as any)
    );
    return data;
  }

  addAccount(account:any) {
    this.http.post(this.url, account)
    .subscribe(data => {
      console.log(data);
    });
  }
}