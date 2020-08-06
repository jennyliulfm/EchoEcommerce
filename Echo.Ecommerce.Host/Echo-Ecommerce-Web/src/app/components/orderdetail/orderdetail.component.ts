import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct, Address } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  public cartItems?: Array<CartProduct>;
  public totalPrice?: number;
  public addresses: Address[];
  public addressForm: FormGroup;
  public errorMessage: string;
  @ViewChild('addressModal', { static: false }) addressModal: ModalDirective;

  constructor(
    private cartService: CartService,
    private router: Router,
    private addressServie: AddressService,
    private formBuilder: FormBuilder,) { 
      this.createAddressForm();
  }


  closeAddressModal() {
    this.addressModal.hide();
  }

  /**
  * Open product moda.
  */
  openAddressModal() {
    this.addressModal.show();

  }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPrice(); 
    this.addressServie.GetAllAddresses()
      .subscribe( (res) => {
        this.addresses = res;
      },
      (error) => {
        this.errorMessage = error;
      });
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

  addAddress(){
    if(this.addressForm.valid){

      // this.addressServie.CreateAddress(this.addressForm.value)
      //   .subscribe(res => {
      //     console.log(res);
      //   },
      //   err => {
      //     console.log(err);
      //   })
    }
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

  createAddressForm(){
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
  }
}
