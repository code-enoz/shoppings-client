import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UploadService } from 'src/app/services/upload.service';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  public selectedFile: File = null
  public isOrderPage: boolean
  public adminIsToUpdate: boolean
  public isCustomer: boolean
  public cartItem: CartItem
  public cartItems: CartItem[]
  public productToUpdate: Product
  public productToHandle: Product
  constructor(private router: Router, private cartsService: CartsService, public productsService: ProductsService, public usersService: UsersService,
    private uploadService: UploadService, public ordersService: OrdersService) { }


  ngOnInit(): void {
    this.adminIsToUpdate = this.usersService.adminIsToUpdate
    this.cartItems = this.cartsService.cartItems
    this.isCustomer = this.usersService.isCustomer
    this.productToHandle = this.productsService.productToHandle
    this.productToUpdate = new Product(undefined, "", undefined, undefined, "");

  }

  public submitOrder() {
    this.ordersService.handleOrderPage()
    this.router.navigate(["/order"])
  }

  public updateProduct(product: Product) {
    console.log("login click works")


    console.log(this.productToUpdate)


    if (this.productToUpdate.name == "") {

      product.name = this.productsService.productToHandle.name
    }

    if (this.productToUpdate.price == undefined) {

      product.price = this.productsService.productToHandle.price
    }



    console.log(product)
    let observable = this.productsService.updateProduct(product)
    observable.subscribe(product => {
      console.log(product)
      alert('yay we are in')



    }, error => {
      alert('problem detected')
      console.log(error)

    }

    )
  }

  public updateProductName(e) {

    console.log(e.value)

    this.productToUpdate.name = e.value
  }

  public updateProductPrice(e) {
    console.log(e.value)
    this.productToUpdate.price = e.value
  }

  public updateProductImage(e) {

    this.selectedFile = <File>e.files[0]
    console.log(this.selectedFile)
    this.productToUpdate.imageUrl = e.files[0].name


    console.log(this.productToUpdate.imageUrl)
  }

  public updateProductCategory(e) {
    console.log(e.value)
    this.productToUpdate.categoryId = e.value
  }



  public removeProductFromCart(cartItem) {
    // this.cartItems.splice()


    this.cartsService.removeItemFromCart(cartItem)


  }


  public createProduct(product: Product) {

    if (product.categoryId == undefined || product.imageUrl == "" || product.name == "" || product.price == undefined) {
      alert("you must fill all of the product details")
      return
    }

    console.log(product)

    console.log(product.imageUrl)
    let newProduct = this.productsService.createProduct(product)
    newProduct.subscribe(product => {
      console.log(product)
    })

    // let fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name)
    // fd.append('file', this.selectedFile)
    // let newProduct = this.uploadService.upload(fd)
    // newProduct.subscribe(fd => {
    // console.log("got here" + fd)
    // })


    // let observable = this.productsService.createProduct(product)

    // observable.subscribe(product => {
    //   console.log(product)

    //   this.productsService.setAdminNewProduct(product)



    // }, error => {
    //   alert ('problem detected')
    //   console.log(error)

    // }

    // )
    // console.log(product)


  }

  public onFileSelected(event) {
    console.log(event)
    this.selectedFile = event.target.files[0]

  }



}
