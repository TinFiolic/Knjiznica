import { Books } from "./Books";

export class Borrowed {
    username : string;
    book : Books; 

    constructor(username: string, book: Books) {
        this.username = username;
        this.book = book;
    }
}