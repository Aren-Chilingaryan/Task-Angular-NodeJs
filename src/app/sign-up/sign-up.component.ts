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
    this.user = await this.tableService.addUser(user);
    this.router.navigateByUrl(`/signin`);
  }

  ngOnInit() {}
}
