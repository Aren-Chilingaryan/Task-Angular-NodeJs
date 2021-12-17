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
  id: number = 0;
  name: string = "";
  creationDate: Date | null = null;
  ownerName: string = "";
  showModal: boolean = false;

  constructor(private router: Router, private tableService: TableService) {}

  btnClick(id: string) {
    this.router.navigateByUrl('/accounts' + '/' + id); 
  }

  openModal() {
    this.showModal = true;
  }

  addAccount() {
    const account:Account = {
      id: this.id,
      name: this.name,
      creationDate: this.creationDate,
      owner: this.ownerName,
    }
    this.tableService.callServer(account);
    this.showModal = false;
    window.location.reload();
  }

  async ngOnInit() {
    await this.tableService.getAccounts().then((account) => {
      this.accounts = account;
    });
    this.id = this.accounts[this.accounts.length - 1].id + 1;
  }
}

