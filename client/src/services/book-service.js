import { get, post, update } from "../ajax/crud";

class BookService {
    constructor() {
        this.baseUrl = "http://localhost:9999/books";
        this.allBooksUrl = `${this.baseUrl}/`;
        this.getDetailsUrl = `${this.baseUrl}/details/`;
        this.createBookUrl = `${this.baseUrl}/create`;
        this.editBookUrl = `${this.baseUrl}/edit/`;
    }

    getAllBooks() {
        return get(this.allBooksUrl);
    }

    getDetails(id, token) {
        return get(this.getDetailsUrl + id, undefined, token);
    }

    create(book, token) {
        return post(this.createBookUrl, book, token);
    }

    edit(id, book, token) {
        return update(this.editBookUrl + id, book, token);
    }
}

export default BookService;