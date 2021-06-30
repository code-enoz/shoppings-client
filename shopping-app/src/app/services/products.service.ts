import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product'
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/Category';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  public products: Product[]
  

   
   public productToHandle : Product
   public adminNewProduct: Product

  
  
  constructor(private http: HttpClient) { 

    this.products = []

    this.productToHandle = new Product(0, "", 0, 0, "");
   

  
   

  }

 

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>
              ("http://localhost:3001/products/");
  }

  public getProductsByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>
                (`http://localhost:3001/products/${id}`)
  }

 

  public setProduct(product){
    console.log(this.productToHandle)
    this.productToHandle = new Product(product.id, product.name, product.categoryId, product.price, product.imageUrl)
    console.log(this.productToHandle)
  }

  public getProduct(){
  return this.productToHandle
  }

  public showProducts(products: Product[]){
   
    this.products.splice(0, this.products.length)
  for (let product of products) {
    this.products.push(product)
  }
  }


  public updateProduct(product: Product){
    return this.http.post(`http://localhost:3001/products/`, product)
  }

  public createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`http://localhost:3001/products/create`, product)
  }

  public setAdminNewProduct(product: Product){
    this.products.push(product)
  }

 

    
}