import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-error',
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7293/api/'
  validateError = signal<string[]>([])

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
  get400Validation() {
    this.http.post(this.baseUrl + 'Account/register', {}).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log(err)
        this.validateError.set(err)
      }
    })
  }
}
