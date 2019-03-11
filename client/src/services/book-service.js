import { get, post, update, remove } from "../ajax/crud";

class BookService {
    constructor() {
        this.baseUrl = "http://localhost:9999/books";
        this.allBooksUrl = `${this.baseUrl}/`;
        this.getDetailsUrl = `${this.baseUrl}/details/`;
        this.createBookUrl = `${this.baseUrl}/create`;
        this.editBookUrl = `${this.baseUrl}/edit/`;
        this.deleteBookUrl = `${this.baseUrl}/delete/`;
    }

    getAllBooks() {
        return get(this.allBooksUrl);
    }

    getDetails(id, token) {
        return get(this.getDetailsUrl + id, token);
    }

    create(book, token) {
        return post(this.createBookUrl, token, book);
    }

    edit(id, book, token) {
        return update(this.editBookUrl + id, token, book);
    }

    delete(id, token) {
        return remove(this.deleteBookUrl + id, token);
    }
}

export default BookService;