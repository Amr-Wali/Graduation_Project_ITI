import { UserService } from './user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';

import {AgmCoreModule} from '@agm/core';

import { AuthInterceptor } from './auth/auth.interceptor';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { PitchComponent } from './pitch/pitch.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    PlayerProfileComponent,
    OwnerProfileComponent,
    PitchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyC0Zjdn7b9Bx3ys0r2v0R1e17N9REfYOWQ'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
