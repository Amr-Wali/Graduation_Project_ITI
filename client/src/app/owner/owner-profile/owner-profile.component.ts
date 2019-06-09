import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {

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
