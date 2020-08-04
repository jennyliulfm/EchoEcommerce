import { Injectable } from '@angular/core';
import { User, UserLogin } from "../models/model"
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BaseURL: string = "https://localhost:5001/User";
  public currentUser?: User;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * 
   * @param user Create User
   */
  CreateUser(user: User): Observable<any> {
    return this.http.post(this.BaseURL + '/RegisterUser', user);
  }

  /**
   * user signin
   */
  UserLogin(user: UserLogin): Observable<any> {
    return this.http.post(this.BaseURL + '/UserLogin', user);
  }

  /**
   * Confirm user account
   */
  confirmEmail(userId: string): Observable<any> {

    var data = {
      Id: userId
    }
    return this.http.put(this.BaseURL + '/ConfirmUserEmailById', data);
  }


  getCurrentUser(): Observable<User> {
    if (this.currentUser != null) {
      return of(this.currentUser);
    } else {
      return this.http.get<User>(this.BaseURL + '/GetCurrentUser');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('home');
  }

  socialLogin(response) {
    return this.http.post(this.BaseURL + '/SocialLogin', response);
  }
}
