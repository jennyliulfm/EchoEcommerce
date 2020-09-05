import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from '../../../app/components/user/user-profile/user-profile.component';
import { AddressManagementComponent } from '../../../app/components/user/address-management/address-management.component';
import { OrderHistoryComponent } from '../../../app/components/user/order-history/order-history.component';
import { UserLayoutComponent } from '../../../app/components/user/user-layout/user-layout.component';

const userRoutes: Routes = [
 {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'addressmanagement', component: AddressManagementComponent },
      { path: 'orderhistory', component: OrderHistoryComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
