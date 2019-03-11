import { post } from "../ajax/crud";

class UserService {
    constructor() {
        this.baseUrl = "http://localhost:9999/users";
        this.registerUrl = `${this.baseUrl}/register`;
        this.loginUrl = `${this.baseUrl}/login`;
    }

    register(credentials) {
        return post(this.registerUrl, undefined, credentials);
    }

    login(credentials) {
        return post(this.loginUrl, undefined, credentials);
    }
}

export default UserService;