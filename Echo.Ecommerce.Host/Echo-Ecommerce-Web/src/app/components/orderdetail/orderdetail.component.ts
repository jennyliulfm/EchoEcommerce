import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  public cartItems?: Array<CartProduct>;
  public totalPrice?: number;

  constructor(
    private cartService: CartService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPrice();
  }

  /**
   * Get cart item
   */
  getCartItems() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }


  /**
   * 
   * @param productId 
   */
  getTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  /**
   * Empty Cart
   */
  emptyCart() {
    this.cartService.emptryCart();
  }

  /**
   * 
   */
  continueShopping() {
    this.router.navigateByUrl('/home');
  }

  removeItemFromCart(item: CartProduct) {
    this.cartService.removeProductFromCart(item);
  }

  /**
   * Modify quantity for an item
   * @param quantity M
   * @param item 
   */
  onEnter(quantity: number, item: CartProduct) {
    if (quantity != 0) {
      this.cartService.updateItemQuantity(quantity, item)
    }
    else {
      this.cartService.removeProductFromCart(item);
    }

    this.getTotalPrice();
  }
}
