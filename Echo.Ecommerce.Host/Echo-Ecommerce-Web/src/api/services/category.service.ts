/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Category } from '../models/category';
@Injectable({
  providedIn: 'root',
})
class CategoryService extends __BaseService {
  static readonly CategoryGetAllCategoriesPath = '/Category/GetAllCategroies';
  static readonly CategoryCreateCategoryPath = '/Category/CreateCategory';
  static readonly CategoryGetCategoryByIdPath = '/Category/GetCategoryById';
  static readonly CategoryDeleteCategoryByIdPath = '/Category/DeleteCategoryById';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  CategoryGetAllCategoriesResponse(): __Observable<__StrictHttpResponse<Array<Category>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Category/GetAllCategroies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Category>>;
      })
    );
  }  CategoryGetAllCategories(): __Observable<Array<Category>> {
    return this.CategoryGetAllCategoriesResponse().pipe(
      __map(_r => _r.body as Array<Category>)
    );
  }

  /**
   * @param model undefined
   */
  CategoryCreateCategoryResponse(model: Category): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Category/CreateCategory`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * @param model undefined
   */
  CategoryCreateCategory(model: Category): __Observable<Category> {
    return this.CategoryCreateCategoryResponse(model).pipe(
      __map(_r => _r.body as Category)
    );
  }

  /**
   * @param categoryId undefined
   */
  CategoryGetCategoryByIdResponse(categoryId?: number): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (categoryId != null) __params = __params.set('categoryId', categoryId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Category/GetCategoryById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * @param categoryId undefined
   */
  CategoryGetCategoryById(categoryId?: number): __Observable<Category> {
    return this.CategoryGetCategoryByIdResponse(categoryId).pipe(
      __map(_r => _r.body as Category)
    );
  }

  /**
   * @param cateogryId undefined
   */
  CategoryDeleteCategoryByIdResponse(cateogryId?: number): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (cateogryId != null) __params = __params.set('cateogryId', cateogryId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Category/DeleteCategoryById`,
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
   * @param cateogryId undefined
   */
  CategoryDeleteCategoryById(cateogryId?: number): __Observable<Blob> {
    return this.CategoryDeleteCategoryByIdResponse(cateogryId).pipe(
      __map(_r => _r.body as Blob)
    );
  }
}

module CategoryService {
}

export { CategoryService }
