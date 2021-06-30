import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { OrderComponent } from './components/order/order.component'
import { PaymentComponent } from './components/payment/payment.component'
import { AdminComponent } from './components/admin/admin.component'




const routes: Routes = [
    { path: "home", component: LoginComponent },
    { path: "main", component: MainComponent },
    { path: "page-not-found", component: PageNotFoundComponent },
    { path: "registration", component: RegisterComponent},
    { path: "order", component: OrderComponent},
    {path: "payment", component: PaymentComponent},
    {path: "admin", component: AdminComponent},
    { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ]
  })
export class RoutingModule {

}