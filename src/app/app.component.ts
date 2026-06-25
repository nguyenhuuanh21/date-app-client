import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './features/home/home.component';
import { User } from './types/user';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,HomeComponent,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  protected router=inject(Router)
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



}


