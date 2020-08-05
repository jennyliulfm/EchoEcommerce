import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { UserService } from "../../../services/user.service"
import { User, UserLogin } from "../../../models/model"
import { CartService } from 'src/app/services/cart.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-topnavigation',
  templateUrl: './topnavigation.component.html',
  styleUrls: ['./topnavigation.component.css']
})
export class TopnavigationComponent implements OnInit {

  @ViewChild('userSignUpModal', { static: false }) userSignupModal: ModalDirective;
  @ViewChild('userSignInModal', { static: false }) userSignInModal: ModalDirective;

  @Input() isNavigationOpen: boolean;
  @Output() toggleNavigationEvent: EventEmitter<boolean> = new EventEmitter;

  public isloggedIn: boolean = false;

  public isCartOpen: boolean = false;
  private currentUser?: User;

  public socialUser: SocialUser;

  public readonly passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!#\$])(?=.{8,14})";

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
    //this.getSocialUser();
  }

  toggleNavigation(): void {
    this.toggleNavigationEvent.emit(this.isNavigationOpen = !this.isNavigationOpen);
  }


  logout(): void {
    this.userSerive.logout();
    this.isloggedIn = false;
  }


  /**
  * Open Singup modal
  */
  openSignupModal(): void {
    this.userSignupModal.show();
  }

  /**
   * Close Signup modal
   */
  closeSignupModal() {
    this.userSignupModal.hide();
  }

  /**
   * Close Signup modal
   */
  closeSignInModal() {
    this.userGroupModel.reset();
    this.userSignInModal.hide();
  }

  /**
   * Open SignInModal
   */
  openSignInModal() {
    this.userSignInModal.show();

  }

  /**
   * close closeSignUpModal()
   */
  closeSignUpModal() {
    this.userSignupModal.hide();
  }

  /**
   * Get userform into form format
   */
  get userFormGroupValue(): UserForm {
    return this.userGroupModel.value;
  }


  /**
   * createUser()
   */
  createUser() {
    this.userSignupModal.hide();
    const args: User = {
      firstName: this.userFormGroupValue.firstName,
      lastName: this.userFormGroupValue.lastName,
      email: this.userFormGroupValue.email,
      password: this.userFormGroupValue.password,
    };

    this.userSerive.CreateUser(args).subscribe(
      res => {
        if (res) {
          this.toasterService.success(`Your Account Has been Created Successfully, Please Check Your Email to Confirm Your Account`);
          this.userGroupModel.reset();
        }
      },
      err => {
        this.toasterService.error(`${err.error.message}`)
        console.error("ERROR: createUser", err);
      }
    )

  }

  /**
   * userLogin()
   */
  userLogin() {
    this.userSignInModal.hide();

    const args: UserLogin = {
      email: this.userFormGroupValue.email,
      password: this.userFormGroupValue.password
    };

    this.userSerive.UserLogin(args).subscribe(
      res => {
        if (res) {

          this.isloggedIn = true;
          this.userGroupModel.reset();

          this.toasterService.success(`You have successfully login`);
          localStorage.setItem('token', res.token);

          // Get current user's information after login.
          this.getCurrentUser();
          this.userSerive.currentUser = this.currentUser;
        }
      },
      err => {
        this.closeSignInModal();
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

            this.isloggedIn = true;

            this.toasterService.success(`You have successfully login`);
            localStorage.setItem('token', res.token);

            // Get current user's information after login.
            this.getCurrentUser();
            this.userSerive.currentUser = this.currentUser;

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

    if (this.userSignInModal.isShown) {
      this.userSignInModal.hide();
    }
  }

  /**
   * Open order detail
   */
  openOrderDetails() {
    this.router.navigateByUrl('order/detail');
  }

}
