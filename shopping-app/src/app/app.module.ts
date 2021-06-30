import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoutingModule } from './routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { UsersService } from './services/users.service';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartsService } from './services/carts.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
   
  LayoutComponent,
   
  HeaderComponent,
   
  MainComponent,
   
  PageNotFoundComponent,
   
  LoginComponent,
   
  RegisterComponent,
   
  MenuComponent,
   
  OrderComponent,
   
  PaymentComponent,
   
  AdminComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,

    // also for router-outlet
    FormsModule,
    
    RouterModule, 
    RoutingModule, BrowserAnimationsModule, NgbModule
   
  ],
  providers: [UsersService, CartsService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }