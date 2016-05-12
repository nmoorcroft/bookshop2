import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service'
import { Book } from './book';

import '../style/app.scss';

@Component({
  selector: 'books-app',
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ],
  providers: [ BooksService ]
})
export class AppComponent {
    constructor (private booksService: BooksService) {}

    errorMessage: string;
    books: Book[];

    ngOnInit() {
        this.booksService.getBooks().subscribe(
            books => this.books = books,
            error => this.errorMessage = <any>error);
    }


}



