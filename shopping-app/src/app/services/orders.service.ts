import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public isOrderPage: boolean

  constructor(private http : HttpClient) {
    this.isOrderPage = false
   }

  public getOrdersNumber(): Observable<number> {
    return this.http.get<number>
              ("http://localhost:3001/orders/numberOfOrders");
  }

  public handleOrderPage(){
    console.log(this.isOrderPage)
    this.isOrderPage = !this.isOrderPage
    console.log(this.isOrderPage)
  }

}