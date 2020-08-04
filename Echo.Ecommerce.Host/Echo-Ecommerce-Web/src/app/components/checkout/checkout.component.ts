import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/models/model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartItems?: Array<CartProduct> ;
  public totalPrice?: number;
  constructor(private cartService: CartService) {

   }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe( items => {
      this.cartItems = items;
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }

}
