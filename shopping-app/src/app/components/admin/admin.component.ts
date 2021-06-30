import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product'
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from '../../services/orders.service'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public numberOfOrders: number
  public products: Product[]
  constructor(
    public ProductsService: ProductsService,
    // private ProductsService: ProductsService,
    private UsersService: UsersService,
    private OrdersService: OrdersService) {
    this.products = this.ProductsService.products
    this.numberOfOrders = 0
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (sessionStorage.getItem("token")) {

        this.handleRefreshToMainPage()
        this.UsersService.isCustomer = false
      }
    }, 0);



    let observable = this.ProductsService.getAllProducts()
    observable.subscribe(products => {
      console.log(products)

      this.ProductsService.showProducts(products)


    })

    let ordersNumber = this.OrdersService.getOrdersNumber()
    ordersNumber.subscribe(
      numberOfOrders => {
        console.log(numberOfOrders)
        this.numberOfOrders = numberOfOrders

      })
  }


  public handleProduct(product: Product) {
    this.UsersService.adminIsToUpdate = true
    console.log(this.UsersService.adminIsToUpdate)
    let productToHandle: Product
    productToHandle = new Product(product.id, product.name, product.categoryId, product.price, product.imageUrl);

    this.ProductsService.setProduct(productToHandle)


  }

  public createProduct() {
    this.UsersService.adminIsToUpdate = false
    console.log(this.UsersService.adminIsToUpdate)
    let productToHandle: Product
    productToHandle = new Product(undefined, "", undefined, undefined, "");
    this.ProductsService.setProduct(productToHandle)
  }

  public handleRefreshToMainPage() {
    this.UsersService.isMainPage = true
  }

}