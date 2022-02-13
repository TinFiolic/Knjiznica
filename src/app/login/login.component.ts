import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../static/User';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormVisible : boolean = true;

  usernameLogin : string = "";
  passwordLogin : string = "";

  usernameRegister : string = "";
  passwordRegister : string = "";
  repeatPasswordRegister : string = "";
  permissionRegister : boolean = false;

  firebaseUrl : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/users.json";

  users : User[] = [];

  poruka : string = "";

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (typeof sessionStorage.getItem("user") !== "undefined" &&
    sessionStorage.getItem("user") !== null) {
      this.router.navigateByUrl('/menu');
    }

    this.http.get(this.firebaseUrl).subscribe(
      (response) => {
        for(let key in response) {
          this.users.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )
  }

  login() {
    for(let i = 0; i < this.users.length; i++) {
      if(this.usernameLogin == this.users[i].username && this.stringToHash(this.passwordLogin).toString() == this.users[i].password.toString()) {
        this.router.navigateByUrl('/menu');
        sessionStorage.setItem("user", JSON.stringify(this.users[i]));
        window.location.reload();
        break;
      } 
    }
    this.poruka = "Kriva kombinacija korisničkog imena i passworda!";
  }

  register() {
    if(this.usernameRegister.length < 5) {
      this.poruka = "Korisničko ime mora biti minimalno 5 znakova!";
      return;
    }

    if(this.passwordRegister.length < 5) {
      this.poruka = "Password mora biti minimalno 5 znakova!";
      return;
    }

    if(this.passwordRegister !== this.repeatPasswordRegister) {
      this.poruka = "Polja za password nisu jednaka!";
      return;
    }

    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].username == this.usernameRegister) {
        this.poruka = "Korisnik sa ovim korisničkim imenom već postoji!";
        return;
      }
    }

    sessionStorage.setItem("user", JSON.stringify(new User(this.passwordRegister, this.usernameRegister, this.permissionRegister ? 1 : 0)));
    this.users.push(new User(this.stringToHash(this.passwordRegister).toString(), this.usernameRegister, this.permissionRegister ? 1 : 0));
    this.http.put<any>(this.firebaseUrl, this.users).subscribe(data => {});
    this.router.navigateByUrl('/menu');

    setTimeout(function(){
      window.location.reload();
    }, 1000);
  }

  switchForms() {
    this.loginFormVisible = !this.loginFormVisible;
  }

  stringToHash(string) {
    var hash = crypto.SHA512(string);   
    return hash;
  }

}
