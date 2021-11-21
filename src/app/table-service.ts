import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableProps } from './interfaces';

@Injectable({ providedIn: 'root' })
export class TableService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  async getAccount(id: string): Promise<TableProps> {
    const url = 'http://localhost:3000/api/accounts' + '/' + id;
    const data = await this.http.get<TableProps>(url).toPromise();
    return data;
  }
}
