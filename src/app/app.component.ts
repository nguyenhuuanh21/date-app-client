import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  private http=inject(HttpClient);
  protected members=signal<any>([]);
  async ngOnInit() {
    // this.http.get('https://localhost:7293/api/Members').subscribe({
    //   next:(res)=>this.members.set(res),
    //   error:(err)=>console.log(err),
    //   complete:()=>console.log('completed')
    // })
    this.members.set(await this.getMembers());
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


