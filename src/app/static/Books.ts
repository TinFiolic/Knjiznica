export class Books {
    author : string;
    country : string; 
    imageLink : string; 
    language : string; 
    link : string; 
    pages : number; 
    title : string; 
    year : number; 

    constructor(author : string, year : number, language : string, link : string, title : string, pages : number, country : string){
        this.author = author;
        this.country = country;
        this.language = language;
        this.link = link;
        this.pages = pages;
        this.title = title;
        this.year = year;
    }
}