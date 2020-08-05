/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Address } from '../models/address';
@Injectable({
  providedIn: 'root',
})
class AddressService extends __BaseService {
  static readonly AddressAddAddressForUserPath = '/Address/AddAddressForUser';
  static readonly AddressGetAllAddressForUserPath = '/Address/GetAllAddressForUser';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param model undefined
   */
  AddressAddAddressForUserResponse(model: Address): __Observable<__StrictHttpResponse<Address>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Address/AddAddressForUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Address>;
      })
    );
  }
  /**
   * @param model undefined
   */
  AddressAddAddressForUser(model: Address): __Observable<Address> {
    return this.AddressAddAddressForUserResponse(model).pipe(
      __map(_r => _r.body as Address)
    );
  }
  AddressGetAllAddressForUserResponse(): __Observable<__StrictHttpResponse<Array<Address>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Address/GetAllAddressForUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Address>>;
      })
    );
  }  AddressGetAllAddressForUser(): __Observable<Array<Address>> {
    return this.AddressGetAllAddressForUserResponse().pipe(
      __map(_r => _r.body as Array<Address>)
    );
  }
}

module AddressService {
}

export { AddressService }
