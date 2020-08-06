import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpBackend, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { CartComponent } from './components/cart/cart.component';
import { TokenInterceptor } from '../app/auth/token.interceptor'
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressService } from './services/address.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    TopnavigationComponent,
    BasicLayoutComponent,
    LogoutComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
    EmailConfirmComponent,
    CartComponent,
    CheckoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    NgxFileDropModule,
    ModalModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AddressService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('298510618024928'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
