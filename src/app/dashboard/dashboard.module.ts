import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDataComponent } from './user-data/users-data.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { UsersListComponent } from './users-list/users-list.component';

import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [UsersDataComponent, HeaderMenuComponent, UsersListComponent],
  imports: [
    CommonModule,
    MenubarModule,
    DashboardRoutingModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
  ],
  exports: [UsersDataComponent, HeaderMenuComponent, UsersListComponent],
})
export class DashboardModule {}
