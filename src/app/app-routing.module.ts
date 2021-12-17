import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { TableDataComponent } from './table-data/table-data.component';

const routes: Routes = [
  {
    path: 'accounts',
    component: TableDataComponent,
    pathMatch: 'full',
  },

  {
    path: 'accounts/:id',
    component: AccountComponent,
  },

  {
    path: '**',
    component: TableDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
