import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>
              ("http://localhost:3001/categories/");
  }
}