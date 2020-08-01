import { Injectable } from '@angular/core';
import { User, UserLogin } from "../models/model"
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BaseURL: string = "https://localhost:5001/User";

  constructor(private http: HttpClient) { }

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
  confirmEmail(uId: string) {
    let params = new HttpParams();
    let testing = { userId: uId};
    
    return this.http.post(this.BaseURL + '/ConfirmUserEmailById', {}, { params: {userId: uId}});
  }
}
