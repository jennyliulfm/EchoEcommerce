import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Category} from '../models/model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly BaseURL: string ="https://localhost:5001/Product";

  constructor(private http: HttpClient) { }

  /**
   * createNewProduct
   */

   createNewProduct(product: Product): Observable<any> {
     console.log(product);
     return this.http.post( this.BaseURL + '/CreateProduct', product);
   }

   /**
    * Get all products
    */
   getAllProducts(): Observable<Array<Product>> {
     return this.http.get<Array<Product>>( this.BaseURL + '/GetAllProducts');
   }

   getProductById(productId: number): Observable<any>{
     return this.http.get<Product>(this.BaseURL + '/GetProductById')
   }
}
 