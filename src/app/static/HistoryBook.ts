import { Books } from "./Books";

export class HistoryBook {
    username : string;
    books : Books; 

    constructor(username: string, books: Books) {
        this.username = username;
        this.books = books;
    }
}