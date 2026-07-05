import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Member, Photo } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { AccountService } from '../../../core/services/account.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { StarButtonComponent } from '../../../shared/star-button/star-button.component';
import { DeteteButtonComponent } from '../../../shared/detete-button/detete-button.component';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUploadComponent, StarButtonComponent,DeteteButtonComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
  protected account=inject(AccountService);
  memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading=signal(false)
  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      });
    }
  }
  onUploadImage(file:File){
    this.loading.set(true)
    this.memberService.uploadPhoto(file).subscribe({
      next: photo=>{
        this.memberService.editMode.set(false)
        this.loading.set(false)
        this.photos.update(photos=>[...photos,photo])
      },
      error: err=>{
        this.loading.set(false)
        console.log('error uploading image: '+err)
      }
    })
  }
  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next:()=>{
        const currentUser=this.account.currentUser()
        if(currentUser){
          currentUser.imageUrl=photo.url
          this.account.setCurrentUser(currentUser)
          this.memberService.member.update(member=>({...member,imageUrl:photo.url}) as Member)
        }
      }
    })
  }
  deletePhoto(photoId:number){
    this.memberService.deletePhoto(photoId).subscribe({
      next:()=>{
        this.photos.update(photos=>photos.filter(p=>p.id!==photoId))
      }
    })
  }
}
