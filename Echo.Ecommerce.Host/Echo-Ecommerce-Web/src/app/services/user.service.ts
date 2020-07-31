import { Injectable } from '@angular/core';
import { User, UserLogin } from "../models/model"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BaseURL: string ="https://localhost:5001/User";

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
  
}
