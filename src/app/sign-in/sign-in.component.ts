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
  credentials: Credentials[] = [];
  loginText: string = '';
  passwordText: string = '';
  wrongPasswordOrLogin: string = '';
  iscorrect: boolean = true;

  constructor(private router: Router, private tableService: TableService) {}

  get login() {
    return this.loginText;
  }
  get password() {
    return Number(this.passwordText);
  }

  btnClick() {
    if (
      this.login == this.credentials[0].login &&
      this.password == this.credentials[0].password
    ) {
      this.logIn();
    }else {
      console.log(this.login);
      console.log(this.password);
    }

  }

  logIn() {
    this.router.navigateByUrl('/accounts');
  }

  async ngOnInit() {
    await this.tableService
      .getCorrectCredential(this.loginText, Number(this.passwordText))
      .then((credential) => {
        const newCredential = [];
        newCredential.push(credential);
        this.credentials = newCredential;
      });
  }
}
