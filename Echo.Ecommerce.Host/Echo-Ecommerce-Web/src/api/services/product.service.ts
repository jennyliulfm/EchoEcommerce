/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
class ProductService extends __BaseService {
  static readonly ProductGetAllProductsPath = '/Product/GetAllProducts';
  static readonly ProductCreateProductPath = '/Product/CreateProduct';
  static readonly ProductGetProductByIdPath = '/Product/GetProductById';
  static readonly ProductDeleteProductByIdPath = '/Product/DeleteProductById';
  static readonly ProductUpdateProductPath = '/Product/UpdateProduct';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  ProductGetAllProductsResponse(): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Product/GetAllProducts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }  ProductGetAllProducts(): __Observable<Array<Product>> {
    return this.ProductGetAllProductsResponse().pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * @param model undefined
   */
  ProductCreateProductResponse(model: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Product/CreateProduct`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param model undefined
   */
  ProductCreateProduct(model: Product): __Observable<Product> {
    return this.ProductCreateProductResponse(model).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param productId undefined
   */
  ProductGetProductByIdResponse(productId?: number): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productId != null) __params = __params.set('productId', productId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Product/GetProductById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param productId undefined
   */
  ProductGetProductById(productId?: number): __Observable<Product> {
    return this.ProductGetProductByIdResponse(productId).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param productId undefined
   */
  ProductDeleteProductByIdResponse(productId?: number): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productId != null) __params = __params.set('productId', productId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Product/DeleteProductById`,
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
   * @param productId undefined
   */
  ProductDeleteProductById(productId?: number): __Observable<Blob> {
    return this.ProductDeleteProductByIdResponse(productId).pipe(
      __map(_r => _r.body as Blob)
    );
  }

  /**
   * @param model undefined
   */
  ProductUpdateProductResponse(model: Product): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Product/UpdateProduct`,
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
  ProductUpdateProduct(model: Product): __Observable<Blob> {
    return this.ProductUpdateProductResponse(model).pipe(
      __map(_r => _r.body as Blob)
    );
  }
}

module ProductService {
}

export { ProductService }
