import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { CartProduct } from '../models/model';
import { FaStackComponent } from '@fortawesome/angular-fontawesome';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public cartItems: Array<CartProduct> = [];



  /**
   * Get cart items
   */
  getProducts(): Observable<any> {
    //return this.products.asObservable();
    return of(this.cartItems);
  }

  //Added by Hao temporally
  getItems(): Observable<CartProduct[]> {

    let observable = Observable.create(observer => observer.next(this.cartItems));
    return observable;
  }
  /**
   * 
   * @param product Add product to cart
   */
  addProductToCart(product: CartProduct) {

    var isAdded = false;

    this.cartItems.map((item, index) => {
      if (item.productId == product.productId) {
        item.quantity += product.quantity;
        isAdded = true;

      }
    });

    if (isAdded == false) {
      this.cartItems.push(product);
    }

  }

  /**
   * Remove product from cart
   * @param productId 
   */
  removeProductFromCart(product: CartProduct) {
    this.cartItems.map((item, index) => {
      if (item.productId == product.productId) {
        this.cartItems.splice(index, 1);
      }
    });

  }

  /**
   * Empty cart
   */
  emptryCart() {
    this.cartItems.length = 0;
  }

  /**
   * Get total price
   */
  getTotalPrice() {
    let total = 0;
    this.cartItems.filter(item => {
      total += item.price * item.quantity;
    });

    return total;
  }

  /**
   * update quanity
   */
  updateItemQuantity(quanity: number, item: CartProduct) {
    this.cartItems.map((item, index) => {
      if (item.productId == item.productId) {
        item.quantity = quanity;
      }
    });
  }

}
