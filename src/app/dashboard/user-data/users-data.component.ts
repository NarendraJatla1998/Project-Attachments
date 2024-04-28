import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user-service.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserList } from '../model/user.model';
@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css'],
})
export class UsersDataComponent implements OnInit, OnDestroy {
  public userList: UserList | any;
  public loadUserData: boolean = false;
  public subscriptions: Subscription[] = [];
  public userId!: number;
  
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById(this.userId);
  }

  getUserById(userId: number) {
    this.spinner.show();
    //Set Timeout for to show the spinner to indicate the User the Data is loading
    setTimeout(() => {
      const subs = this.userService.getUserById(userId).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.userList = response.data;
          this.loadUserData = true;
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
      this.subscriptions.push(subs);
    }, 2000);
  }

  navigateToUserPage() {
    this.router.navigate(['/users']);
    this.userService?.triggerBackEvent(true);
  }

  // To Unsubscribe the all the Services and observable calls
  ngOnDestroy(): void {
    this.subscriptions.forEach(res=>res.unsubscribe());
  }
}
