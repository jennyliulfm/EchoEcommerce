import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../../../app/components/user/user-profile/user-profile.component';
import { AddressManagementComponent } from '../../../app/components/user/address-management/address-management.component';
import { OrderHistoryComponent } from '../../../app/components/user/order-history/order-history.component';

import { UserRoutingModule } from '../user-routing/user-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ 
    UserProfileComponent,
    AddressManagementComponent,
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    UserRoutingModule,
  ]
})
export class UserModule { }
