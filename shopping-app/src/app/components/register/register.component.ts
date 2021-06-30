import { Component, OnInit } from '@angular/core';
import { UserSignupDetails } from '../../models/UserSignupDetails'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  public userSignupDetails: UserSignupDetails
  constructor(private UsersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userSignupDetails = new UserSignupDetails("", "", "", "", "")


  }

  public login() {
    this.router.navigate(["/home"])
  }

  public register() {
    console.log("register click works")
    let observable = this.UsersService.register(this.userSignupDetails)
    observable.subscribe(successfulLoginServerResponse => {
      console.log(successfulLoginServerResponse)
      alert('yay we are in')

      this.router.navigate(["/main"])
    }, error => {
      alert('problem detected')
      console.log(error)
    }

    )
  }

}