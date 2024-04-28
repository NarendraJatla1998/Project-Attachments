import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  public items: any[] = [];
  public search: string = '';
  public inputSubject = new Subject();
  public subscriptions: Subscription[] = [];
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
   this.pageInit();
  }

  pageInit() {
    this.userService.triggerBack$.subscribe((data) => {
      if (data) {
        this.search = '';
      }
    });
   this.loadMenu();
   this.subToSearch();
  }
  loadMenu() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: 'users',
        command: () => {
          this.search = '';
        },
      },
    ];
  }

  subToSearch() {
    const subs = this.inputSubject.pipe(debounceTime(500)).subscribe((res) => {
      if (this.search) {
        this.router.navigate([`/user/${this.search}`]);
      }
    });
    this.subscriptions.push(subs);
  }

  searchUser() {
    this.inputSubject.next(this.search);
  }

  // To Unsubscribe the all the Services and observable calls
  ngOnDestroy(): void {
    this.subscriptions.forEach(res=>res.unsubscribe());
  }

}
