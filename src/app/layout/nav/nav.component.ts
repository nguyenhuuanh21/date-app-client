import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
@Component({
  selector: 'app-nav',
  imports:  [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected account=inject(AccountService)
  protected creds:any={
    email:'',
    password:''
  }
  login(){
    this.account.login(this.creds).subscribe({
      next:(res)=>{
        console.log(res);
        this.creds={
          email:'',
          password:''
        }
      },
      error:(err)=>alert(err.message)
    })
  }
  logout(){
    this.account.logout();
  }
}
