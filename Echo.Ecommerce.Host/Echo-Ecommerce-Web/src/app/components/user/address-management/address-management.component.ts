import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css']
})
export class AddressManagementComponent implements OnInit {

  addresses: Address[] = [];
  errMess: String ="";
  addressForm: FormGroup;
  @ViewChild('addressModal', { static: false }) addressModal: ModalDirective;

  constructor(private addressService: AddressService,
    private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.addressService.getAllAddresses()
      .subscribe(res => this.addresses = res,
        err => this.errMess = err);
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

  createAddressForm(){
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
  }
  addAddress(){
    if(this.addressForm.valid){

      this.addressService.createNewAddress(this.addressForm.value)
        .subscribe(res => {
          console.log(res);
        },
        err => {
          console.log(err);
        })
    }
  }
}
