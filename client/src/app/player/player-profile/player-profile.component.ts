import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  userDetails;
  error;
  ngOnInit() {
    this.userService.getUser().subscribe(
      res => {
        console.log(res);
        this.userDetails = res;
      },
      err => {
        this.error = err.message;
      }
    );
  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
