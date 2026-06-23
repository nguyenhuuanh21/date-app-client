import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from './layout/nav/nav.component';
import { AccountService } from './core/services/account.service';
import { HomeComponent } from './features/home/home.component';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected account=inject(AccountService);
  title = 'client';
  private http=inject(HttpClient);
  protected members=signal<any>([]);
  protected memberTest:Array<User>=[
    {
      id:'1',
      displayName:'test',
      token:'test',
      email:'test@example.com'
    },
    {
      id:'2',
      displayName:'test2',
      token:'test2',
      email:'test2@example.com'
    },
    {
      id:'3',
      displayName:'test3',
      token:'test3',
      email:'test3@example.com'
    }
  ]
  async ngOnInit() {
    // this.http.get('https://localhost:7293/api/Members').subscribe({
    //   next:(res)=>this.members.set(res),
    //   error:(err)=>console.log(err),
    //   complete:()=>console.log('completed')
    // })
    this.setCurrentUser()
    this.members.set(await this.getMembers());
  }
  setCurrentUser(){
    const user=localStorage.getItem('user');
    if(user){
      this.account.currentUser.set(JSON.parse(user));
    }
  }
  async getMembers(){
    try{
      return await lastValueFrom(this.http.get('https://localhost:7293/api/Members')) ;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
}


