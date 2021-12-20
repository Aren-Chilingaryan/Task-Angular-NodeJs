import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';
@Injectable({ providedIn: 'root' })
export class TableService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  formatDate(date: Date | null) {
    const formattedDate = moment(date).lang('en').format('DD/MM/YYYY') as any;
    return formattedDate;
  }

  async getAccount(id: string): Promise<Account> {
    const url = `${this.url}/${id}`;
    const data = await this.http.get<Account>(url).toPromise();
    data.creationDate = this.formatDate(data.creationDate);
    return data;
  }

  async getAccounts() {
    const data = await this.http.get<Account[]>(this.url).toPromise();
    data.forEach(
      (item) => (item.creationDate = this.formatDate(item.creationDate))
    );
    return data;
  }

  async addAccount(account: any) {
    const data = await this.http.post(this.url, account).toPromise();
    return data;
  }

  deleteAccount(id: string) {
    const data = this.http.delete(`${this.url}/delete/${id}`).toPromise();
    return data;
  }
}
