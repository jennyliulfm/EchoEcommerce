/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Order } from '../models/order';
@Injectable({
  providedIn: 'root',
})
class OrderService extends __BaseService {
  static readonly OrderGetAllOrdersPath = '/Order/GetAllOrders';
  static readonly OrderCreateOrderPath = '/Order/CreateOrder';
  static readonly OrderGetOrdersForUserPath = '/Order/GetOrdersForUser';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  OrderGetAllOrdersResponse(): __Observable<__StrictHttpResponse<Array<Order>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Order/GetAllOrders`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Order>>;
      })
    );
  }  OrderGetAllOrders(): __Observable<Array<Order>> {
    return this.OrderGetAllOrdersResponse().pipe(
      __map(_r => _r.body as Array<Order>)
    );
  }

  /**
   * @param model undefined
   */
  OrderCreateOrderResponse(model: Order): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Order/CreateOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param model undefined
   */
  OrderCreateOrder(model: Order): __Observable<Order> {
    return this.OrderCreateOrderResponse(model).pipe(
      __map(_r => _r.body as Order)
    );
  }
  OrderGetOrdersForUserResponse(): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Order/GetOrdersForUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }  OrderGetOrdersForUser(): __Observable<Order> {
    return this.OrderGetOrdersForUserResponse().pipe(
      __map(_r => _r.body as Order)
    );
  }
}

module OrderService {
}

export { OrderService }
