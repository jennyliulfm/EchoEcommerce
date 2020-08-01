import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product } from '../models/model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly BASEURL: string = "https://localhost:5001/Category"
  constructor(
    private http: HttpClient) {

  }

  /**
 * Crate Category
 */
  createCategory(category: Category): Observable<any> {
    return this.http.post(this.BASEURL + '/CreateCategory', category);
  }

  /**
   * Get all Category
   */
  getAllCateogries(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.BASEURL + '/GetAllCategroies');
  }
}
