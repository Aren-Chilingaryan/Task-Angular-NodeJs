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

  constructor(private tableService: TableService, private router: Router) {}

  async register(user: User) {
    const newUser = await this.tableService.addUser(user);
    if (newUser) {
      localStorage.setItem('authorizedUser', JSON.stringify(newUser));
    }
    this.router.navigateByUrl(`/accounts`);
  }

  ngOnInit() {}
}
