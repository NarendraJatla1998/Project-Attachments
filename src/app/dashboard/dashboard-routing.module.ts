import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDataComponent } from './user-data/users-data.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent },
    { path: 'user/:id', component: UsersDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
