import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

const routes: Routes = [
  {
    path: 'accounts',
    component: AccountsListComponent,
    pathMatch: 'full',
  },

  {
    path: 'accounts/:id',
    component: AccountComponent,
  },

  {
    path: '**',
    component: AccountsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
