import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from '../../models/UserLoginDetails'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails
  constructor(private UsersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (sessionStorage.getItem("token")) {
        this.UsersService.isMainPage = false
      }
    }, 0);
    this.userLoginDetails = new UserLoginDetails("", "")
  }

  public login() {
    console.log("login click works")
    let observable = this.UsersService.login(this.userLoginDetails)
    console.log(observable)
    observable.subscribe(successfulLoginServerResponse => {
      console.log(successfulLoginServerResponse)
      alert('yay we are in')




      sessionStorage.setItem("token", successfulLoginServerResponse.authToken)
      localStorage.setItem("userStreet", successfulLoginServerResponse.userStreet)


      this.UsersService.isMainPage = !this.UsersService.isMainPage

      console.log(this.UsersService.isMainPage)

      if (successfulLoginServerResponse.userType == "admin") {
        this.UsersService.disableForAdmin = true
        this.UsersService.isCustomer = false
        this.router.navigate(["/admin"])
      }

      if (successfulLoginServerResponse.userType == "client") {
        this.UsersService.isCustomer = true
        this.router.navigate(["/main"])
      }

    }, error => {
      alert('problem detected')
      console.log(error)
    }

    )
  }

  public register() {
    this.router.navigate(["/registration"])
  }

}