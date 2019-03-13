import { get, post, update, remove } from "../ajax/crud";

class ListService {
    constructor() {
        this.baseUrl = "http://localhost:9999/lists";
        this.myListsUrl = `${this.baseUrl}/myLists`;
        this.detailsUrl = `${this.baseUrl}/details/`;
        this.createListUrl = `${this.baseUrl}/create`;
        this.deleteListUrl = `${this.baseUrl}/delete/`;
        this.addUrl = `${this.baseUrl}/add`;
        this.removeUrl = `${this.baseUrl}/remove`;
    }

    getMyLists(token) {
        return get(this.myListsUrl, token);
    }

    getDetails(id, token) {
        return get(this.detailsUrl + id, token);
    }

    create(token, list) {
        return post(this.createListUrl, token, list);
    }

    delete(id, token) {
        return remove(this.deleteListUrl + id, token);
    }

    distributeBookToList(token, data) {
        return update(this.addUrl, token, data);
    }

    displaceBookFromList(token, data) {
        return update(this.removeUrl, token, data);
    }
}

export default ListService;