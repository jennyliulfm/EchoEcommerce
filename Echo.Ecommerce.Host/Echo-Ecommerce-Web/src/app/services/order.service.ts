import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly BaseURL: string ="https://localhost:5001/Order";

  constructor(private http: HttpClient) { }

  CreateNewOrder(order: Order){
    return this.http.post( this.BaseURL + '/CreateOrder', order);
  }
}
