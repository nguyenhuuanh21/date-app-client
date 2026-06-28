import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { AccountService } from '../../../core/services/account.service';
import { MemberService } from '../../../core/services/member.service';

@Component({
  selector: 'app-member-detail',
  imports: [ RouterLink, RouterLinkActive, RouterOutlet,AgePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private account=inject(AccountService);
  public memberService=inject(MemberService);
  // protected member=signal<Member | undefined>(undefined);
  protected title = signal<string | undefined>('Profile');
  protected isCurrentUser=computed(()=>{
    return this.account.currentUser()?.id===this.route.snapshot.paramMap.get('id')
  })
  ngOnInit(): void {
    // this.route.data.subscribe({
    //   next: (data) => {
    //     this.member.set(data['member']);
    //   }
    // })
    this.title.set(this.route.firstChild?.snapshot?.title)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    });
  }
}
