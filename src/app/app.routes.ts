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

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:id', component: MemberDetailComponent },
            { path: 'lists', component: ListComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: 'errors', component: TestErrorComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
