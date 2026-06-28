import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { themes } from '../theme';
@Component({
  selector: 'app-nav',
  imports:  [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  protected account=inject(AccountService)
  private router=inject(Router)
  private toast=inject(ToastService)
  protected creds:any={
    email:'',
    password:''
  }
  protected selectedTheme=signal<string>(localStorage.getItem('theme') || 'light')
  protected themes=themes

  ngOnInit(){
    document.documentElement.setAttribute('data-theme', this.selectedTheme())
  }

  handleSelectTheme(theme:string){
    this.selectedTheme.set(theme)
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    const elm=document.activeElement as HTMLDivElement
    if(elm){
      elm.blur()
    }
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
