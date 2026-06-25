import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-nav',
  imports:  [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected account=inject(AccountService)
  private router=inject(Router)
  private toast=inject(ToastService)
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
        },
        this.toast.success('Login successfully', 5000)
        this.router.navigateByUrl('/members')
      },
      error:(err)=>this.toast.error(err.message, 5000)
    })
  }
  logout(){
    this.account.logout();
    this.router.navigateByUrl('/')
  }
}
