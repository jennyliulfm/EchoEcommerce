import { NgModule } from '@angular/core';
import { Routes, RouterModule, QueryParamsHandling } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { TopnavigationComponent } from './components/common/topnavigation/topnavigation.component';
import { BasicLayoutComponent } from './components/layouts/basic-layout/basic-layout.component';

import { LogoutComponent } from './components/user/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/admin/product/product.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { EmailConfirmComponent } from './components/user/email-confirm/email-confirm.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './auth/auth.guard'
import { OrderdetailComponent } from './components/orderdetail/orderdetail.component';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AddressManagementComponent } from './components/user/address-management/address-management.component';
import { OrderHistoryComponent } from './components/user/order-history/order-history.component';
import { AdminModule } from '../app/modules/admin/admin.module';
import { UserModule } from '../app/modules/user/user.module';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: '../app/modules/admin/admin.module#AdminModule'},
  { path: 'user', loadChildren: '../app/modules/user/user.module#UserModule'},


  // {
  //   path: '',
  //   component: BasicLayoutComponent,
  //   children: [
  //     // { path:'', redirectTo:'home', pathMatch: 'full'},

  //     { path: 'admin/product', component: ProductComponent, },
  //     { path: 'admin/category', component: CategoryComponent, },
  //     { path: 'user/emailconfirm', component: EmailConfirmComponent, },
  //     { path: 'order/detail', component: OrderdetailComponent },
  //     { path: 'order/checkout', component: CheckoutComponent }
  //   ],
  // },
  // {
  //   path: 'userLayout',
  //   component: UserLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },
  //     { path: 'user/profile', component: UserProfileComponent },
  //     { path: 'user/addressmanagement', component: AddressManagementComponent },
  //     { path: 'user/orderhistory', component: OrderHistoryComponent }
  //   ]
  // }
];
