import { get, post } from "../ajax/crud";

class BookService {
    constructor() {
        this.baseUrl = "http://localhost:9999/books";
        this.allBooksUrl = `${this.baseUrl}/`;
        this.createBookUrl = `${this.baseUrl}/create`;
    }

    getAllBooks() {
        return get(this.allBooksUrl);
    }

    create(book, token) {
        return post(this.createBookUrl, book, token);
    }
}

export default BookService;