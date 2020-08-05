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
import { CheckoutComponent} from './components/checkout/checkout.component';
import { AuthGuard } from './auth/auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      { path:'', redirectTo:'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'admin/product', component: ProductComponent, canActivate: [AuthGuard]},
      { path: 'admin/category', component: CategoryComponent, canActivate: [AuthGuard]},
      { path: 'user/emailconfirm', component: EmailConfirmComponent,canActivate: [AuthGuard] },
      { path: 'order/checkout', component:CheckoutComponent,canActivate: [AuthGuard]}
    ]
  },
];
