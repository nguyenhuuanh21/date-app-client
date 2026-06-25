import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private account=inject(AccountService)
  constructor() { }
  init(){
    const userString=localStorage.getItem('user');
    if(!userString) return of(null)
    const user=JSON.parse(userString);
    this.account.setCurrentUser(user);

    return of(null)
  }
}
