import { Component, OnInit } from '@angular/core';
import { Account } from '../interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  btnClick(id: string) {
    this.router.navigateByUrl('/accounts' + '/' + id);
  }

  ngOnInit() {
    this.http
      .get<any>('http://localhost:3001/api/accounts')
      .subscribe((data) => {
        this.accounts = data;
        this.accounts.forEach(
          (item) =>
            (item.creationDate = moment(item.creationDate)
              .lang('en')
              .format(' DD/MM/YYYY') as any)
        );
      });
  }
}
