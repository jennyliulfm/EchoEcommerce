import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {
    firstName:"",
    lastName:"",
    password:"",
    email:""
  };
  errMess: string = "";
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(res => this.user = res,
        err => this.errMess = err);
  }

}
