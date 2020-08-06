/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { User } from '../models/user';
import { SocialUser } from '../models/social-user';
@Injectable({
  providedIn: 'root',
})
class UserService extends __BaseService {
  static readonly UserRegisterUserPath = '/User/RegisterUser';
  static readonly UserConfirmUserEmailByIdPath = '/User/ConfirmUserEmailById';
  static readonly UserUserLoginPath = '/User/UserLogin';
  static readonly UserGetCurrentUserPath = '/User/GetCurrentUser';
  static readonly UserSocialLoginPath = '/User/SocialLogin';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param model undefined
   */
  UserRegisterUserResponse(model: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/User/RegisterUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param model undefined
   */
  UserRegisterUser(model: User): __Observable<User> {
    return this.UserRegisterUserResponse(model).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param model undefined
   */
  UserConfirmUserEmailByIdResponse(model: User): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/User/ConfirmUserEmailById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'blob'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Blob>;
      })
    );
  }
  /**
   * @param model undefined
   */
  UserConfirmUserEmailById(model: User): __Observable<Blob> {
    return this.UserConfirmUserEmailByIdResponse(model).pipe(
      __map(_r => _r.body as Blob)
    );
  }

  /**
   * @param model undefined
   */
  UserUserLoginResponse(model: User): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/User/UserLogin`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'blob'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Blob>;
      })
    );
  }
  /**
   * @param model undefined
   */
  UserUserLogin(model: User): __Observable<Blob> {
    return this.UserUserLoginResponse(model).pipe(
      __map(_r => _r.body as Blob)
    );
  }
  UserGetCurrentUserResponse(): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/User/GetCurrentUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }  UserGetCurrentUser(): __Observable<User> {
    return this.UserGetCurrentUserResponse().pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param model undefined
   */
  UserSocialLoginResponse(model: SocialUser): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/User/SocialLogin`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'blob'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Blob>;
      })
    );
  }
  /**
   * @param model undefined
   */
  UserSocialLogin(model: SocialUser): __Observable<Blob> {
    return this.UserSocialLoginResponse(model).pipe(
      __map(_r => _r.body as Blob)
    );
  }
}

module UserService {
}

export { UserService }
