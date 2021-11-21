import { Component, OnInit } from '@angular/core';
import { TableProps } from '../interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  accounts: TableProps[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  btnClick(id: string) {
    this.router.navigateByUrl('/accounts' + '/' + id);
  }

  ngOnInit() {
    this.http
      .get<any>('http://localhost:3000/api/accounts')
      .subscribe((data) => {
        this.accounts = data;
      });
  }
}
