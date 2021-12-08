import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, Credentials } from './interfaces';
import * as moment from 'moment';
import { environment } from './../environments/environment';

@Injectable({ providedIn: 'root' })
export class TableService implements OnInit {
  accounts: Account[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {}

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

  async getCredentials(){
    const url = environment.apiUrlCred;
    const data = await this.http.get<Credentials[]>(url).toPromise();
    return data;
  }

  async getCorrectCredential(login:string, password:number){
    const url = environment.apiUrlCred + '/' + login + '/' + password;
    const data = await this.http.get<Credentials>(url).toPromise();
    return data;
  }


}
