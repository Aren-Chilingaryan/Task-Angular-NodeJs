import { Component, OnInit } from '@angular/core';
import { TableService } from './table-service';
import { ActivatedRoute } from '@angular/router';
import { Account } from './interfaces';
@Component({
  selector: 'app-table',
  template: `
    <p-table [value]="account" responsiveLayout="scroll">
      <ng-template pTemplate="header">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Owner</th>
          <th>Created On</th>
          <th>Updated On</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-OneAccount>
        <tr class="panel">
          <td>{{ OneAccount.id }}</td>
          <td>{{ OneAccount.name }}</td>
          <td>{{ OneAccount.owner }}</td>
          <td>{{ OneAccount.creationDate }}</td>
          <td>{{ OneAccount.creationDate }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [``],
})

export class AccountComponent implements OnInit {
  account: Account[] = [];
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.tableService.getAccount(id).then((account) => {
      const newArray = [];
      newArray.push(account);
      this.account = newArray;
    });
  }
}
