import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CartProduct } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public cartItems: Array<CartProduct> = [];
  public products = new Subject();


  /**
   * Get cart items
   */
  getProducts(): Observable<any> {
    return this.products.asObservable();
  }

  /**
   * 
   * @param product Add product to cart
   */
  addProductToCart(product: CartProduct) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);
  }

  /**
   * Remove product from cart
   * @param productId 
   */
  removeProductFromCart( productId: number) {

    this.cartItems.map((item, index) => {
      if (item.productId == productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.products.next(this.cartItems);
  }

  /**
   * Empty cart
   */
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
  }

 /**
  * Get total price
  */
  getTotalPrice() {
    let total = 0;
    this.cartItems.filter(item => {
      total += item.price;
    });

    return total;
  }

}