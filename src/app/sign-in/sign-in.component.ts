import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../table-service';
import { Credentials } from '../interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  credentials: Credentials | any = {};
  isValid: boolean = true;

  constructor(private router: Router, private tableService: TableService) {}

  async signIn(credentials: Credentials) {
    const authorizedUser = await this.tableService.getAuthorizedUser(
      credentials
    );
    if (authorizedUser) {
      this.router.navigateByUrl('/accounts');
    } else {
      this.isValid = false;
    }
  }

  ngOnInit() {}
}
