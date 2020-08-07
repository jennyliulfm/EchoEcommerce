import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct, Address, Order, OrderProduct } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

interface AddressForm {
  street: string;
  city: string;
  country: string;
  passcode: string;
}


@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  public cartItems?: Array<CartProduct> = [];
  public totalPrice?: number = 0;
  public addresses: Array<Address> = [];
  public isAddedNew: boolean = false;
  public selectedAddressId: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private addressServie: AddressService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderService: OrderService) {
      this.getAddressForUser();
  }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPrice();
  }

  public readonly addressGroupModel: FormGroup = this.formBuilder.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    passcode: ['', Validators.required],
  });


  get getAddressGroupModelValue(): AddressForm {
    return this.addressGroupModel.value;
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
   * 
   */
  addNewAddress() {
    
    const args: Address ={
     street: this.getAddressGroupModelValue.street,
     city: this.getAddressGroupModelValue.street,
     country: this.getAddressGroupModelValue.country,
     passcode: this.getAddressGroupModelValue.passcode
    }

    this.addressServie.createNewAddress(args).subscribe(
      res => {
        this.addressGroupModel.reset();
        this.getAddressForUser();
        this.isAddedNew = false;
      },
      err => {

      }
    );

  }
  /**
   * Modify quantity for an item
   * @param quantity M
   * @param item 
   */
  onEnter(item: CartProduct) {
    if (item.quantity != 0) {
      this.cartService.updateItemQuantity(item)
    }
    else {
      this.cartService.removeProductFromCart(item);
    }

    this.getTotalPrice();
  }

  /**
   * 
   */
  getAddressForUser() {
    this.addressServie.getAllAddresses().subscribe(
      res => {
        this.addresses = res;
      },
      err => {
        this.toastrService.error(`${err.error.message}`)
        console.error("ERROR: getAddressForUser", err);
      }
    );
   
  }

  /**
   * 
   */
  addMoreAddress() {
    this.isAddedNew = !this.isAddedNew;
  }

  /**
   * 
   */
  selectAddress(addressId: number) {
    this.selectedAddressId = addressId;
  }

  /**
   * Create order
   */
  createNewOrder() {

    const args: Order = {
      price: this.totalPrice,
      addressId: Number(this.selectedAddressId),
      
      orderProducts: []     
    }

    var orderProduct: OrderProduct = {};
    for( let item of this.cartItems) {
      orderProduct = {};
      orderProduct.productId = item.productId;
      orderProduct.quantity = Number(item.quantity);
      args.orderProducts.push(orderProduct);
    }
    console.log(args);

    this.orderService.createNewOrder(args).subscribe(
      res => {
        console.log("result");
        console.log(res);

      },
      err => {

      }
    )

  }

}
