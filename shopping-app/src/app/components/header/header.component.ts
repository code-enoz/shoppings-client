import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isMainPage: boolean
  constructor(private router: Router, private cartsService: CartsService, public usersService: UsersService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.isMainPage = true
  }

  public logout() {
    sessionStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(["/home"])
    this.cartsService.clearCartItems();
    console.log(this.cartsService.cartItems);
    this.usersService.isMainPage = false
    this.ordersService.isOrderPage = false
    this.usersService.disableForAdmin = false
  }

  public navMain() {
    this.ordersService.handleOrderPage()
    this.router.navigate(["/main"])
  }

}