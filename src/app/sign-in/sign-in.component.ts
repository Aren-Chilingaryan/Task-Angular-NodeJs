import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../table-service';
import { Credential } from '../interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  credentials: Credential | any = {};
  isValid: boolean = true;

  constructor(private router: Router, private tableService: TableService) {}

  async signIn(credentials: Credential) {
    const authorizedUser = await this.tableService.signIn(credentials);
    if (authorizedUser) {
      localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
      this.router.navigateByUrl('/accounts');
    } else {
      this.isValid = false;
    }
  }

  goToSignup() {
    this.router.navigateByUrl('/sign-up');
  }

  ngOnInit() {}
}
