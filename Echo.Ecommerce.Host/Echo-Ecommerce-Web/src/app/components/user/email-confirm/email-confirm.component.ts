import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {

  public userId: string;
  private expiredDate: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('uid');
    this.expiredDate = this.route.snapshot.queryParamMap.get('ex');
    
    this.userService.confirmEmail(this.userId).subscribe (
      res => {
        this.router.navigateByUrl('home');
      },

      err => {
        console.log(`Error: ConfirmEmail`);
      }
    )
  }
}
