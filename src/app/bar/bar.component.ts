import { Component, OnInit } from '@angular/core';
import { User } from '../static/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

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

    /*Problem je kaj je samo na init check za storage*/

  logout() {
    this.loggedUser = null;
    sessionStorage.removeItem("user");
    this.router.navigateByUrl('/login');

  }

}
