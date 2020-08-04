import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct, Address } from 'src/app/models/model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartItems?: Array<CartProduct> ;
  public totalPrice?: number;
  public addresses?: Array<Address>;
  constructor(private cartService: CartService,
    private addressService: AddressService) {
    this.cartService.getItems().subscribe( items => {
      this.cartItems = items;
      console.log(items);
    });
   }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe( items => {
      this.cartItems = items;
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }

}
