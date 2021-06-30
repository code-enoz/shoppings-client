import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Order } from '../../models/Order'
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public isOrderComplete: boolean
  public order: Order
  public cartItems: CartItem[]
  public cartPrice: number
  constructor(private router: Router, private cartsService: CartsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.order = new Order(null, null, null, "", "", null, null, null);
    this.cartItems = this.cartsService.cartItems
    this.cartPrice = this.cartsService.cartPrice
    this.isOrderComplete = false
    // setTimeout is just a hack to stop an error while changing value in ngOnInit... why the problem apears?
    setTimeout(() => {
      if (sessionStorage.getItem("token")) {
        this.usersService.isMainPage = true
      }
    }, 0);
  }


  public submitOrder() {
    console.log("login click works")
    this.order.cartId = parseInt(localStorage.getItem("USER_CART"))
    this.order.price = this.cartPrice
    console.log(this.order)


    if (this.order.cartId == null || this.order.price == null || this.order.city == "" || this.order.street == "" || this.order.deliveryDate == null || this.order.cr4Digits == null) {
      alert("All fields must be filled")
      console.log("fields not filled correctly")
      return
    }

    if (this.order.cr4Digits < 1000 || this.order.cr4Digits > 9999) {
      alert("credit card must contain 4 digits")
      return
    }

    console.log("passed filling fields")

    let observable = this.cartsService.orderCart(this.order)
    console.log(observable)
    observable.subscribe(order => {
      console.log(order)

      this.isOrderComplete = true


    }, error => {
      alert('problem detected')
      console.log(error)

    }

    )
  }
  public enterUserStreet() {
    console.log("enterUserStreetWorks!")
    this.order.street = localStorage.getItem("userStreet")
  }

  public saveFile = () => {



    let cartItems = this.cartItems
    let data = 'Reciept:'

    for (let item of cartItems) {
      let string = '\r Name: ' + '' + item.name + '' + 'Price:' + '' + item.price + '' + 'Amount:' + '' + item.amount + '' + 'Total price:' + '' + (item.price * item.amount) + '' + ' \r\n '
      data = data + string
    }

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.


    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }

    newLink.click();

  }


  public finishShopping() {
    this.router.navigate(["/main"])
    this.cartsService.clearCartItems()
    let observable = this.cartsService.updatePurchaseCartStatus(this.order);
    console.log(observable)
    observable.subscribe(() => {

    }, error => {
      alert('problem detected')
      console.log(error)

    })


  }


}