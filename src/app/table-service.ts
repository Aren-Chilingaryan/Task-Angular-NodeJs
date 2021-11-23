import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './interfaces';

@Injectable({ providedIn: 'root' })
export class TableService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  async getAccount(id: string): Promise<Account> {
    const url = 'http://localhost:3001/api/accounts' + '/' + id;
    const data = await this.http.get<Account>(url).toPromise();
    return data;
  }
}
