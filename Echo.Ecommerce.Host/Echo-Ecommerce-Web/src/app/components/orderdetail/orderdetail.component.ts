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
<<<<<<< HEAD
  public addresses: Address[];
  public addressForm: FormGroup;
  public errorMessage: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    private addressServie: AddressService,
    private formBuilder: FormBuilder) { 
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
=======

  constructor(
    private cartService: CartService,
    private router: Router) {
>>>>>>> 40cd4bd904d031bc14e492aa1329f1beb2e530e4
  }

  ngOnInit(): void {
    this.getCartItems();
<<<<<<< HEAD
    this.getTotalPrice(); 
    this.addressServie.GetAllAddresses()
      .subscribe( (res) => {
        this.addresses = res;
      },
      (error) => {
        this.errorMessage = error;
      });
=======
    this.getTotalPrice();
>>>>>>> 40cd4bd904d031bc14e492aa1329f1beb2e530e4
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
=======
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
>>>>>>> 40cd4bd904d031bc14e492aa1329f1beb2e530e4
  }
}
