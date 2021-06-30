import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse'
import { UserLoginDetails } from '../models/UserLoginDetails'
import { Observable } from 'rxjs';
import { UserSignupDetails } from '../models/UserSignupDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public disableForAdmin: boolean
  public isMainPage: boolean
  public isCustomer: boolean
  public adminIsToUpdate: boolean
  constructor(private http: HttpClient) {
    this.disableForAdmin = false
    this.isMainPage = false
    this.isCustomer = true
    this.adminIsToUpdate = false
   }

  public login(userLoginDetails : UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>
              ("http://localhost:3001/users/login", userLoginDetails);
  }

  
  public register(userSignupDetails : UserSignupDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>
              ("http://localhost:3001/users/register", userSignupDetails);
  }

  

  
}