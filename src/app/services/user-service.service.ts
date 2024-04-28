import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiHandler} from './api.handler'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiHandler: ApiHandler) { }
  public baseURL = 'https://reqres.in/api/users'
  getUsersList(page: number) {
    return this.apiHandler.get(`${this.baseURL}?page=${page}`).pipe(
      map((response) => {
        if (response) {
          return response
        } else {
          return null;
        }
      })
    ).pipe(catchError(this.handleError));
  }

  getUserById(id: number) {
    return this.apiHandler.get(`${this.baseURL}/${id}`).pipe(
      map((response) => {
        if (response) {
          return response
        } else {
          return null;
        }
      })
    ).pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    return of(error.error);
  }

  private triggerBack = new BehaviorSubject(false);
  //Observable to subscribe the Event
  triggerBack$ = this.triggerBack.asObservable();
  // Emit the Event
  triggerBackEvent(value: boolean) {
    this.triggerBack.next(value);
  }
}
