import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct, Address, Order, OrderProduct } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
<<<<<<< HEAD
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

interface AddressForm {
  street: string;
  city: string;
  country: string;
  passcode: string;
}

=======
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f

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
<<<<<<< HEAD
    private toastrService: ToastrService,
    private orderService: OrderService) {
      this.getAddressForUser();
=======
    private orderService: OrderService,
    private userService: UserService) { 
      this.createAddressForm();
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
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


<<<<<<< HEAD
  get getAddressGroupModelValue(): AddressForm {
    return this.addressGroupModel.value;
=======
  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPrice(); 
    this.addressServie.getAllAddresses()
      .subscribe( (res) => {
        this.addresses = res;
      },
      (error) => {
        this.errorMessage = error;
      });
    this.getTotalPrice();
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
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

<<<<<<< HEAD
  /**
   * 
   */
  addNewAddress() {
    
    const args: Address ={
     street: this.getAddressGroupModelValue.street,
     city: this.getAddressGroupModelValue.street,
     country: this.getAddressGroupModelValue.country,
     passcode: this.getAddressGroupModelValue.passcode
=======
  addAddress(){
    if(this.addressForm.valid){

      this.addressServie.createAddress(this.addressForm.value)
        .subscribe(res => {
          console.log(res);
        },
        err => {
          console.log(err);
        })
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
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

<<<<<<< HEAD
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

=======
  addOrder(){
    console.log("added");
    if(this.cartItems!=null && this.totalPrice != 0){
    
      var orderProducts: OrderProduct[] = [];
      this.cartItems.map(item=>{
        orderProducts.push({productId: item.productId, quantity:Number(item.quantity)});
      })
      var order: Order = { 
        orderId: -1, 
        price: this.totalPrice, 
        user: this.userService.currentUser,
        orderProducts: orderProducts
      }
      this.orderService.createNewOrder(order)
        .subscribe( res=>{
          console.log(res);
        },
        err=>{
          alert(err.toString());
        });
    }
  }
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
}
