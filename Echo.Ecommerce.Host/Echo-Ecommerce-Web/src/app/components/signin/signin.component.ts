import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleLoginProvider, FacebookLoginProvider, SocialUser, SocialAuthService } from 'angularx-social-login';
import { UserLogin, User, BannerPhoto } from 'src/app/models/model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

interface UserForm {
  email: string;
  password: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public readonly passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!#\$])(?=.{8,14})";
  public bgImage: BannerPhoto;

  private currentUser?: User;

  public socialUser: SocialUser;

  public readonly userGroupModel: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private userSerive: UserService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    public cartService: CartService,
    private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  /**
   * Get userform into form format
   */
  get userFormGroupValue(): UserForm {
    return this.userGroupModel.value;
  }


 

  /**
   * userLogin()
   */
  userLogin() {

    const args: UserLogin = {
      email: this.userFormGroupValue.email,
      password: this.userFormGroupValue.password
    };

    this.userSerive.UserLogin(args).subscribe(
      res => {
        if (res) {


          this.userGroupModel.reset();

          this.toasterService.success(`You have successfully login`);
          localStorage.setItem('token', res.token);

          // Get current user's information after login.
          this.getCurrentUser();
          this.userSerive.currentUser = this.currentUser;
          this.checkLogin();
        }
      },
      err => {

        this.toasterService.error(`${err.error.message}`)
        console.error("ERROR: createUser", err);
      }
    );

  }

  /**
   * To get current loggedin
   */
  getCurrentUser() {
    this.userSerive.getCurrentUser().subscribe(
      res => {
        this.currentUser = res;
      },
      err => {
        this.toasterService.error(`${err.error.message}`)
        console.error("ERROR: GetCurrentUser", err);
      }
    );
  }


  /**
   * Login with google
   */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.getSocialUser();

  }

  /**
   * Log in with FB
   */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.getSocialUser();

  }

  /**
   * Get loggined social media user
   */
  getSocialUser() {
    this.authService.authState.subscribe(
      res => {
        this.socialUser = res;

        this.userSerive.socialLogin(this.socialUser).subscribe(
          res => {

            this.toasterService.success(`You have successfully login`);
            localStorage.setItem('token', res.token);

            // Get current user's information after login.
            this.getCurrentUser();
            this.userSerive.currentUser = this.currentUser;

            this.checkLogin();

          },
          err => {
            this.toasterService.error(`${err.error.message}`)
            console.error("ERROR: GetCurrentUser", err);

          }
        );

      },

      err => {
        console.log("ERROR: GetSocialUser Failed");
      }
    );

  }

  /**
   * Open order detail
   */
  openOrderDetails() {
    this.router.navigateByUrl('order/detail');
  }

  /**
   * check login 
   */
  checkLogin() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
    } else {

    }
  }

  getBackgroundImage():string {
    this.bgImage = {
      id: 3,
      title: "Testing1",
      url: '../../../assets/styles/images/banner/topbanner/5.png',
      thumbnailUrl: '../../../assets/styles/images/banner/topbanner/5.png'

    }

    return "url(" + this.bgImage.url + ")";
  }

}
