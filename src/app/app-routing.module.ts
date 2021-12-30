import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent,
  },

  {
    path: 'accounts',
    component: AccountsListComponent,
  },

  {
    path: 'accounts/:id',
    component: AccountComponent,
  },

  {
    path: '**',
    component: SignUpComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
