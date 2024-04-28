import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserList } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  public userList: UserList[] = [];
  public subscriptions: Subscription[] = [];
  public currentPage!: number;
  public loadUserData: boolean = false;
  public totalPages!: number;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentPage = 1;
    this.getUsersData(this.currentPage);
  }

  getUsersData(pageNumber: number) {
    this.spinner.show();
    //Set Timeout for to show the spinner to indicate the User the Data is loading
    setTimeout(() => {
      const subs = this.userService.getUsersList(pageNumber).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.userList = response.data;
          this.totalPages = response?.total_pages;
          this.loadUserData = true;
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
      this.subscriptions.push(subs);
    }, 2000);
  }

  nextPage() {
    this.currentPage++;
    this.loadUserData = false;
    this.getUsersData(this.currentPage);
  }

  prevPage() {
    this.currentPage--;
    this.loadUserData = false;
    this.getUsersData(this.currentPage);
  }

  getUserById(id: any) {
    this.router.navigate([`/user/${id}`]);
  }

  // To Unsubscribe the all the Services and observable calls
  ngOnDestroy(): void {
    this.subscriptions.forEach(res=>res.unsubscribe());
  }
}
