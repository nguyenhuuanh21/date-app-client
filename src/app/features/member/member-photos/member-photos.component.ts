import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../../../types/member';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent {
  private memberService=inject(MemberService);
  private route=inject(ActivatedRoute);
  protected photos$?:Observable<Photo[]> 
  placeholders = Array.from({ length: 20 });
  constructor(){
    const memberId=this.route.parent?.snapshot.paramMap.get('id')
    if(memberId){
      this.photos$=this.memberService.getMemberPhotos(memberId)
    }
  }
}
