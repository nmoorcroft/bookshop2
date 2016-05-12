import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksService {

    constructor(private http: Http) {}

    private booksUrl = 'http://localhost:8090/books';

    getBooks(): Observable<Book[]> {
        return this.http.get(this.booksUrl).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response: ' + res.status);
        }
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


}

