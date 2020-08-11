import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct, Address, OrderProduct, Order } from 'src/app/models/model';
import { AddressService } from 'src/app/services/address.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartItems?: Array<CartProduct> ;
  public totalPrice: number = 0;
  public addresses?: Array<Address>;
  constructor(private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService) {
   }

  ngOnInit(): void {
    this.cartService.getItems().subscribe( items => {
      this.cartItems = items;
    });
    this.totalPrice = this.cartService.getTotalPrice();
    console.log(this.totalPrice);
    this.addressService.getAllAddresses().subscribe( addresses => {
      this.addresses = addresses;
    })
    
  }

  onSubmit(){
    console.log("clicked confirm");
    if(this.cartItems!=null && this.totalPrice != 0)
    {
      var orderProducts: OrderProduct[] = [];
      this.cartItems.map(item=>{
        orderProducts.push({productId: item.productId, quantity:item.quantity});
      })
      var order: Order = { 
        orderId: null, 
        price: null, 
        user: null,
        orderProducts: null
      }

      order.price =this.totalPrice;
      order.orderProducts = orderProducts;
      this.orderService.createNewOrder(order)
        .subscribe( res=>{
          console.log(res);
        },
        err=>{
          alert(err.toString());
        });
    }

  }

}
