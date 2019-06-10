import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { OwnerGuard } from './auth/owner.guard';
import { PlayerGuard } from './auth/player.guard';
import { SignGuard } from './auth/sign.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PlayerComponent } from './player/player/player.component';
import { OwnerComponent } from './owner/owner/owner.component';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent, canActivate: [SignGuard] }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent, canActivate: [SignGuard] }]
  },
  {
    path: 'player', component: PlayerComponent, canActivate: [AuthGuard, PlayerGuard],
    children: [{ path: 'profile', component: PlayerProfileComponent },
    { path: '', redirectTo: '/player/profile', pathMatch: 'full' }
    ]
  },
  {
    path: 'owner', component: OwnerComponent, canActivate: [AuthGuard, OwnerGuard],
    children: [{ path: 'profile', component: OwnerProfileComponent },
    { path: '', redirectTo: '/owner/profile', pathMatch: 'full' }
    ]
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'invalid', component: NotAuthorizedComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
