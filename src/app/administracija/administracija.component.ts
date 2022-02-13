import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../static/Books';
import { User } from '../static/User';

@Component({
  selector: 'app-administracija',
  templateUrl: './administracija.component.html',
  styleUrls: ['./administracija.component.css']
})
export class AdministracijaComponent implements OnInit {

  booksJson : string = "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json";
  knjigeJson : string = "https://faks-24a45-default-rtdb.europe-west1.firebasedatabase.app/knjige.json";

  vanjskeKnjige : Books[] = [];
  naseKnjige : Books[] = [];

  loggedUser : User = null;

  search : string = "";

  selectedTab : number = 0;

  poruka : string = "";
  porukaHappy : string = "";

  unosAutor : string = "";
  unosZemlja : string = "";
  unosJezik : string = "";
  unosLink : string = "";
  unosStranice : number;
  unosNaslov : string = "";
  unosGodina : number;

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (typeof sessionStorage.getItem("user") !== "undefined" &&
    sessionStorage.getItem("user") !== null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("user"));

      if(this.loggedUser.permission != 1)
        this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/login');
    }

    /*Vanjski izvor knjiga*/
    this.http.get(this.booksJson).subscribe(
      (response) => {
        for(let key in response) {
          this.vanjskeKnjige.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )

    /*Nase knjige*/
    this.http.get(this.knjigeJson).subscribe(
      (response) => {
        for(let key in response) {
          this.naseKnjige.push({...response[key]});
        }
      },

      (error) => {
        console.log("Error: " + error);
      }
    )
  }

  importBooks() {
    this.http.put<any>(this.knjigeJson, this.vanjskeKnjige).subscribe(data => {});

    setTimeout(function(){
      window.location.reload();
    }, 2000);

  }

  redirectMenu() {
    this.router.navigateByUrl("/menu");
  }

  obrisiKnjigu(book : Books) {
    for(let i = 0; i < this.naseKnjige.length; i++) {
      if(book.author == this.naseKnjige[i].author && book.country == this.naseKnjige[i].country &&
        book.language == this.naseKnjige[i].language && book.link == this.naseKnjige[i].link &&
        book.pages == this.naseKnjige[i].pages && book.title == this.naseKnjige[i].title &&
        book.year == this.naseKnjige[i].year) {

        this.naseKnjige.splice(i, 1);
        this.http.put<any>(this.knjigeJson, this.naseKnjige).subscribe(data => {});
        this.search = "";
        break;
      }
    }
  }

  unesiKnjigu() {
    if(this.unosAutor.length == 0 || this.unosNaslov.length == 0 || this.unosStranice == 0) {
      this.poruka = "Autor, naslov i broj stranica su obavezni podatci!";
      this.porukaHappy = "";
    } else {
      this.naseKnjige.push(new Books(this.unosAutor, this.unosGodina, this.unosJezik, this.unosLink, this.unosNaslov, this.unosStranice, this.unosZemlja));
      this.http.put<any>(this.knjigeJson, this.naseKnjige).subscribe(data => {});
      this.porukaHappy = "Uspješan unos!";
      this.poruka = "";
    }
  }

  changeTab(num : number) {
    this.selectedTab = num;
  }

}
