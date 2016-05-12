import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksService {

    constructor(private http: Http) {}

    private booksUrl = 'http://localhost:8090/books';

    getBooks(): Observable<Book[]> {
        return this.http.get(this.booksUrl).map(res => res.json()).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


}

