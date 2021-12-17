import { Component, OnInit } from '@angular/core';
import { Account } from '../interfaces';
import { Router } from '@angular/router';
import { TableService } from '../table-service';
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  accounts: Account[] = [];
  name:string = "";
  creationDate:string = "";
  ownerName:string = "";
  showModal:boolean = false;

  constructor(private router: Router, private tableService: TableService) {}

  btnClick(id: string) {
    this.router.navigateByUrl('/accounts' + '/' + id);
    
  }

  addAccountButton() {
    this.showModal = true;
  }

  ngOnInit() {
    this.tableService.getAccounts().then((account) => {
      this.accounts = account;
    });
  }
}
