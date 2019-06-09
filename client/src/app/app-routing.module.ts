import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'player', canActivate: [AuthGuard],
    children: [{ path: 'profile', component: PlayerProfileComponent },
    { path: '', redirectTo: '/player/profile', pathMatch: 'full' }
    ]
  },
  {
    path: 'owner', canActivate: [AuthGuard],
    children: [{ path: 'profile', component: OwnerProfileComponent },
    { path: '', redirectTo: '/owner/profile', pathMatch: 'full' }
    ]
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
