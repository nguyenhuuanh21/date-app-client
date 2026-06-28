import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MemberListComponent } from './features/member/member-list/member-list.component';
import { MemberDetailComponent } from './features/member/member-detail/member-detail.component';
import { ListComponent } from './features/list/list.component';
import { MessagesComponent } from './features/messages/messages.component';
import { authGuard } from './core/guards/auth.guard';
import { TestErrorComponent } from './features/test-error/test-error/test-error.component';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';
import { MemberProfileComponent } from './features/member/member-profile/member-profile.component';
import { MemberPhotosComponent } from './features/member/member-photos/member-photos.component';
import { MemberMessagesComponent } from './features/member/member-messages/member-messages.component';
import { memberResolver } from './features/member/member.resolver';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { 
                path: 'members/:id',
                resolve:{member: memberResolver},
                runGuardsAndResolvers: 'always',
                component: MemberDetailComponent,
                children:[
                    {path:'',redirectTo:'profile',pathMatch:'full'},
                    {path:'profile',component: MemberProfileComponent,title:'Profile'},
                    {path:'photos',component: MemberPhotosComponent,title:'Photos'},
                    {path:'messages',component: MemberMessagesComponent,title:'Messages'}
                ]
            },
            { path: 'lists', component: ListComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: 'errors', component: TestErrorComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
