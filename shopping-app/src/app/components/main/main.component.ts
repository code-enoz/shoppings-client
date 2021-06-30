import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category'
import { ProductsService } from '../../services/products.service'
import { CategoriesService } from '../../services/categories.service'
import { CartsService } from 'src/app/services/carts.service';
import { CartItem } from 'src/app/models/CartItem';
import { Cart } from 'src/app/models/Cart';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public newProduct: Product
  public carts: Cart[]
  public cart: Cart
  public cartItems: CartItem[]
  public products: Product[]
  public categories: Category[]
  constructor(
    private usersService: UsersService,
    public ProductsService: ProductsService,
    private CategoriesService: CategoriesService, private cartsService: CartsService) {
    this.products = this.ProductsService.products
    this.cartItems = []
    this.newProduct = this.ProductsService.adminNewProduct

  }

  ngOnInit(): void {


    // setTimeout is just a hack to stop an error while changing value in ngOnInit... why the problem apears?
    setTimeout(() => {
      if (sessionStorage.getItem("token")) {
        this.handleRefreshToMainPage()
      }
    }, 0);




    //  TEST FOR UPDATING LIST OFF PRODUCTS AFTER ADMIN CREATED A PRODUCT
    // let newProduct = this.ProductsService.createProduct()
    // if (newProduct == new Product(0, "", 0, 0, "")) {
    //   console.log("admin not added a new product")
    // }
    // else {
    //   newProduct.subscribe(newProduct => {})
    // }






    let cart = this.cartsService.createCart(this.cart)
    cart.subscribe(cart => {
      console.log(cart)
      sessionStorage.setItem('USER_CART', cart.cartId.toString())
    })


    let categories = this.CategoriesService.getAll()

    categories.subscribe(categories => {
      console.log(categories)
      this.categories = categories
    })



    let observable = this.ProductsService.getAllProducts()

    observable.subscribe(products => {
      console.log(products)
      this.ProductsService.showProducts(products)

    })


  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


  public getProductsByCategory(id) {
    let observable = this.ProductsService.getProductsByCategory(id)

    observable.subscribe(products => {
      console.log(products)
      this.ProductsService.showProducts(products)
    })
  }





  public getProducts() {
    console.log("you clicked me!")
    let observable = this.ProductsService.getAllProducts()

    observable.subscribe(products => {
      console.log(products)
      this.ProductsService.showProducts(products)


    })
  }

  public addToCart(product) {
    let itemAmountGrowth: boolean = false
    let cartItem: CartItem
    cartItem = new CartItem(product.name, product.price, 1)
    // for( let item of this.cartItems){
    for (let item of this.cartsService.cartItems) {
      if (item.name == product.name) {
        item.amount = item.amount + 1
        this.cartsService.updateCartPrice(item.price)
        itemAmountGrowth = true
        console.log("item amount grows")
      }
    }
    if (itemAmountGrowth == false) {

      this.cartItems.push(cartItem)
      console.log(this.cartItems)
      this.cartsService.addToCart(cartItem)
      console.log(this.cartsService)
    }
  }

  public handleRefreshToMainPage() {
    this.usersService.isMainPage = true
  }

  public provideLastCart() {
    console.log("provideLastCart")





  }



}