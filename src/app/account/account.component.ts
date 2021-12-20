import { Component, OnInit } from '@angular/core';
import { TableService } from '../table-service';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../interfaces';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  account: Account[] = [];
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    if (id) {
      this.tableService.getAccount(id).then((account) => {
        this.account = [account];
      });
    } else {
      throw 'Id is not defined';
    }
  }
}
