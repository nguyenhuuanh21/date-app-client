import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Member, Photo } from '../../types/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'Members');
  }
  getMember(id:string){
    return this.http.get<Member>(this.baseUrl+'Members/'+id);
  }
  getMemberPhotos(id:string){
    return this.http.get<Photo[]>(this.baseUrl+'Members/'+id+'/photos');
  }
}
