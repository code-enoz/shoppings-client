import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { SuccessfulCreatedCartResponse } from '../models/SuccessfulCreatedCartResponse';
import { Order } from '../models/Order';
import { SuccessfulCreatedOrderResponse } from '../models/SuccessfulCreatedOrderResponse';


@Injectable({
  providedIn: 'root'
})
export class CartsService {

  
  public cartItems : CartItem[];
  public cartPrice : number;



  constructor(private http : HttpClient) {
    this.cartItems = [];
    this.cartPrice = 0;
   
   }


  public createCart(cart: Cart): Observable<SuccessfulCreatedCartResponse> { 
    return this.http.post<SuccessfulCreatedCartResponse>("http://localhost:3001/carts/", cart)
  }

  public addToCart(cartItem) {
  this.cartItems.push(cartItem)
  this.cartPrice = this.cartPrice + cartItem.price
  }

  public updateCartPrice(itemPrice) {
    this.cartPrice = this.cartPrice + itemPrice
  }


  public orderCart(order: Order):Observable<SuccessfulCreatedOrderResponse> {
 
    return this.http.post<SuccessfulCreatedOrderResponse>
   
    ("http://localhost:3001/orders/", order)
  }

  public clearCartItems(){
   
    this.cartItems.splice(0,this.cartItems.length);
    this.cartPrice = 0;
  }

  public updatePurchaseCartStatus(order: Order){
    return this.http.post(`http://localhost:3001/carts/purchase/`, order)
  }

  public userFinishedToOrder(){
    localStorage.removeItem("USER_CART")
    sessionStorage.removeItem("USER_CART")
    
  }

  public getCartForUser(order: Order){
    return this.http.post(`http://localhost:3001/carts/cartForUser`, order)
  }

 

  public removeItemFromCart(cartItem){
   
  
   
      let index = this.cartItems.indexOf(cartItem);
      if (cartItem.amount > 1) {
        this.cartItems[index].amount = cartItem.amount - 1
        this.cartPrice = this.cartPrice - cartItem.price
      }
      else{
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.cartPrice = this.cartPrice - cartItem.price
        if (this.cartPrice == NaN){
          this.cartPrice = 0
        }
      }
    }
  
    }
 

}