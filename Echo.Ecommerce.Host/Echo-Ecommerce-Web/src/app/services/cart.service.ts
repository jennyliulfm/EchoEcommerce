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

  //Added by Hao temporally
  getItems(): Observable<CartProduct[]>{

    let observable = Observable.create(observer => observer.next(this.cartItems));
    return observable;
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
  removeProductFromCart( product: CartProduct) {

    this.cartItems.map((item, index) => {
      if (item.productId == product.productId) {
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
