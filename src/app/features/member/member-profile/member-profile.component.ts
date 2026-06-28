import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm?: NgForm;
  memberService = inject(MemberService)
  private toast = inject(ToastService)
  private account=inject(AccountService)
  protected editTableMember: EditTableMember={
    displayName: '',
    description: '',
    city: '',
    country: ''
  }
  constructor() {

  }
  ngOnInit(): void {
    
    this.editTableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description||'',
      city: this.memberService.member()?.city||'',
      country: this.memberService.member()?.country || ''
    }
  }
  updateProfile() {
    if (!this.memberService.member()) return
    const updatedMember = { ...this.memberService.member(), ...this.editTableMember }
    this.memberService.updateMember(updatedMember).subscribe({
      next:()=>{
        const currentUser=this.account.currentUser()
        if(currentUser&&currentUser?.displayName!==updatedMember.displayName){
          currentUser.displayName=updatedMember.displayName
          this.account.setCurrentUser(currentUser)
        }
        this.toast.success('Profile updated successfully', 3000)
        this.memberService.editMode.set(false)
        this.memberService.member.set(updatedMember as Member)
        this.editForm?.reset(this.editTableMember)
      }
    })
    this.memberService.editMode.set(false)
  }
  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false)
    }
  }
}
