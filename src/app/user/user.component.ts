import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../static/Books';
import { Borrowed } from '../static/Borrowed';
import { HistoryBook } from '../static/HistoryBook';
import { User } from '../static/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  booksJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/knjige.json";
  borrowedBooksJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/posudba.json";
  borrowedBooksHistoryJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/posudbaPovijest.json";

  knjige : Books[] = [];
  posudbe : Borrowed[] = [];
  posudbeHistory : HistoryBook[] = [];

  currentUser : string = "";

  tab : number = 0;

  search : string = "";

  loggedUser : User = null;

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {

    if (typeof sessionStorage.getItem("user") !== "undefined" &&
    sessionStorage.getItem("user") !== null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
      if(this.loggedUser.permission == 0) {
        this.router.navigateByUrl('/login');
      }
    } else {
      this.router.navigateByUrl('/login');
    }

    /*Sve knjige*/
    this.http.get(this.booksJson).subscribe(
      (response) => {
        for(let key in response) {
          this.knjige.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )

    /*Posudbe*/
    this.http.get(this.borrowedBooksJson).subscribe(
      (response) => {
        for(let key in response) {
          this.posudbe.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )

    /*Posudbe povijest*/
    this.http.get(this.borrowedBooksHistoryJson).subscribe(
      (response) => {
        for(let key in response) {
          this.posudbeHistory.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )
    
    this.currentUser = window.location.pathname.split('/')[2];
  }

  redirectMenu() {
    this.router.navigateByUrl('/administracija');
  }

  vrati(author : string, year : number, language : string, link : string, title : string, pages : number, country : string) {
    var ovaKnjiga = new Books(author, year, language, link, title, pages, country);
    this.knjige.push(ovaKnjiga);

    this.http.put<any>(this.booksJson, this.knjige).subscribe(data => {});

    for(let i = 0; i < this.posudbe.length; i++) {
      if(author == this.posudbe[i].book.author && country == this.posudbe[i].book.country &&
        language == this.posudbe[i].book.language && link == this.posudbe[i].book.link &&
        pages == this.posudbe[i].book.pages && title == this.posudbe[i].book.title &&
        year == this.posudbe[i].book.year) {
          this.posudbe.splice(i, 1);
          this.http.put<any>(this.borrowedBooksJson, this.posudbe).subscribe(data => {});
      }
    }
  }

  changeTab(num : number) {
    this.tab = num;
    console.log(this.posudbeHistory);
  }


}
