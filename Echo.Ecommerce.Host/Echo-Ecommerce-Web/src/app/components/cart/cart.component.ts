import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems?: Array<CartProduct> ;
  public totalPrice?: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPrice(); 
  }
  
  /**
   * Get cart item
   */
  getCartItems() {
    this.cartService.getProducts().subscribe( items => {
      this.cartItems = items;
    });
  }

  /**
   * 
   * @param productId 
   */
  getTotalPrice()
  {
    this.totalPrice = this.cartService.getTotalPrice();
  }
  /**
   * remove product from cart
   * @param productId 
   */
  removeItemFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }

  /**
   * Empty Cart
   */
  emptyCart() {
    this.cartService.emptryCart();
  }

}
