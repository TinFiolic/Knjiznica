import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../static/Books';
import { Borrowed } from '../static/Borrowed';
import { HistoryBook } from '../static/HistoryBook';
import { User } from '../static/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  booksJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/knjige.json";
  borrowedBooksJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/posudba.json";
  borrowedBooksHistoryJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/posudbaPovijest.json";

  knjige : Books[] = [];
  posudbe : Borrowed[] = [];
  posudbeHistory : HistoryBook[] = [];

  posudbeKorisnika : HistoryBook[] = [];

  tab : number = 0;

  search : string = "";

  loggedUser : User = null;

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {

    if (typeof sessionStorage.getItem("user") !== "undefined" &&
    sessionStorage.getItem("user") !== null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
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
    console.log(this.posudbe);
    for(let i = 0; i < this.posudbeHistory.length; i++) {
      console.log(this.posudbeHistory[i]);
      if(this.posudbeHistory[i].username == this.loggedUser.username) {
        this.posudbeKorisnika.push(this.posudbeHistory[i]);
      }
    }
    
  }

  updateBooks() {
    console.log(this.knjige);
  }

  redirectMenu() {
    this.router.navigateByUrl('/menu');
  }

  posudi(knjiga : Books) {
    for(let i = 0; i < this.knjige.length; i++) {
      if(knjiga.author == this.knjige[i].author && knjiga.country == this.knjige[i].country &&
        knjiga.language == this.knjige[i].language && knjiga.link == this.knjige[i].link &&
        knjiga.pages == this.knjige[i].pages && knjiga.title == this.knjige[i].title &&
        knjiga.year == this.knjige[i].year) {

        var knjiga = this.knjige[i];
        var borrowedBook = new Borrowed(this.loggedUser.username, knjiga);
        this.posudbe.push(borrowedBook);

        this.knjige.splice(i, 1);

        this.http.put<any>(this.booksJson, this.knjige).subscribe(data => {});
        this.http.put<any>(this.borrowedBooksJson, this.posudbe).subscribe(data => {});
        this.search = "";
        break;
      }
    }
  }

  changeTab(num : number) {
    this.tab = num;
  }

}
