import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  protected error=signal<ApiError|null>(null)
  private router= inject(Router)
  protected showDetails=false
  constructor(){
    const navigation=this.router.getCurrentNavigation()
    this.error.set(navigation?.extras.state?.['error'] ?? null)
  }
  detailToggle(){
    this.showDetails=!this.showDetails
  }
}
