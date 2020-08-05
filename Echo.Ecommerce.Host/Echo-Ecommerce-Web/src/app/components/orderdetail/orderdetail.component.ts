import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct, Address } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})

export class OrderdetailComponent implements OnInit {
  @ViewChild('addressModal', { static: false }) addressModal: ModalDirective;
  public cartItems?: Array<CartProduct> ;
  public totalPrice?: number;
  public addresses: Address[];
  private addressForm: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private addressServie: AddressService,
    private formBuilder: FormBuilder) { 
      this.createAddressForm();
  }

  closeProductModal() {
    this.addressModal.hide();
  }

  /**
  * Open product moda.
  */
  openProductModal() {
    this.addressModal.show();
  }

  ngOnInit(): void {
    
    this.getCartItems();
    this.getTotalPrice(); 
    this.addressServie.GetAllAddresses()
      .subscribe( res => this.addresses = res);
  }
  
  
  /**
   * Get cart item
   */
  getCartItems() {
    this.cartService.getItems().subscribe( items => {
      this.cartItems = items;
    });
  }
  

  /**
   * 
   * @param productId 
   */
  getTotalPrice()
  {
    
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

  createAddressForm(){
    this.addressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country:['', [Validators.required]]
    });
  }

  removeItemFromCart(item: CartProduct) {
    this.cartService.removeProductFromCart(item);
  }
}
