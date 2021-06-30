import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public isMainPage: boolean
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.isMainPage = this.usersService.isMainPage
  }

}
