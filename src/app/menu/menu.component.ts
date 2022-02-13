import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../static/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedUser : User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof sessionStorage.getItem("user") !== "undefined" &&
    sessionStorage.getItem("user") !== null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  redirectKnjige() {
    this.router.navigateByUrl('/knjige');
  }

  redirectAdmin() {
    this.router.navigateByUrl('/administracija');
  }

  redirectProfil() {
    this.router.navigateByUrl('/profil');
  }
}
