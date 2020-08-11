import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly BaseURL: string ="https://localhost:5001/Order";

  constructor(private http: HttpClient) { }

  /**
   * place order
   * @param order 
   */
  createNewOrder(order: Order){
    return this.http.post( this.BaseURL + '/CreateOrder', order);
  }

  /**
   * Get all orders for user
   */
  getAllOrdersForUser(): Observable<any[]>{
    return this.http.get<any[]>( this.BaseURL + '/GetOrdersForUser');
  }
}
