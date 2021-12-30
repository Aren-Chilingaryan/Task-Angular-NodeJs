import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { Router } from '@angular/router';
import { TableService } from '../table-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User | any = {};
  usersList: User[] = [];

  constructor(private tableService: TableService, private router: Router) {}

  addUser(user: User) {
    const newAccounts = this.usersList.slice(0);
    this.tableService.addUser(user).then((newAccount) => {
      newAccounts.push(newAccount as User);
      this.usersList = newAccounts;
    });
    this.router.navigateByUrl(`/signin`);
  }

  ngOnInit() {
    console.log(this.usersList);
  }
}
