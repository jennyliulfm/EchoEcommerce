import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly BaseURL: string = "https://localhost:5001/Order";

  constructor(private http: HttpClient) { }

  /**
<<<<<<< HEAD
   * 
   * @param order 
   */
  createNewOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.BaseURL + '/CreateOrder', order);
=======
   * place order
   * @param order 
   */
  createNewOrder(order: Order){
    return this.http.post( this.BaseURL + '/CreateOrder', order);
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
  }

  /**
   * Get all orders for user
   */
  getAllOrdersForUser(): Observable<any[]>{
    return this.http.get<any[]>( this.BaseURL + '/GetOrdersForUser');
  }
}
