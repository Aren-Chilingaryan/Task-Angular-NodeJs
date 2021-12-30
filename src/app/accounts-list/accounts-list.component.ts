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

  async addAccount(
    name: string,
    creationDate: Date | string,
    ownerName: string
  ) {
    let newAccounts = this.accounts.slice(0);
    const account = {
      name: name,
      creationDate: creationDate,
      owner: ownerName,
    };
    this.showModal = false;
    const newAccount = await this.tableService.addAccount(account);
    newAccounts.push(newAccount);
    this.accounts = newAccounts;
  }

  async deleteAccount(id: string) {
    let newAccounts = this.accounts.slice(0);
    const deletedAccount = await this.tableService.deleteAccount(id);
    newAccounts = this.tableService.deleteItemFromArray(
      newAccounts,
      deletedAccount
    );
    this.accounts = newAccounts;
  }

  getAllAccounts() {
    this.tableService.getAccounts().then((account) => {
      this.accounts = account;
    });
  }

  ngOnInit() {
    this.getAllAccounts();
  }
}
