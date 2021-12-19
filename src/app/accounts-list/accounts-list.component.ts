import { Component, OnInit } from '@angular/core';
import { Account } from '../interfaces';
import { Router } from '@angular/router';
import { TableService } from '../table-service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})

export class AccountsListComponent implements OnInit {
  accounts: Account[] = [];
  showModal: boolean = false;

  constructor(private router: Router, private tableService: TableService) {}

  btnClick(id: string) {
    this.router.navigateByUrl(`/accounts/${id}`); 
  }

  openModal() {
    this.showModal = true;
  }

  addAccount(name:string, creationDate:Date | string, ownerName:string) {
    const account = {
      name:name,
      creationDate: creationDate,
      owner: ownerName,
    }
    this.tableService.addAccount(account);
    this.showModal = false;
    window.location.reload();
  }

   ngOnInit() {
     this.tableService.getAccounts().then((account) => {
      this.accounts = account;
    });
  }
}