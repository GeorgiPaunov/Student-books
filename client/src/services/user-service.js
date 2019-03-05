import { post } from "../ajax/crud";

class UserService {
    constructor() {
        this.baseUrl = "http://localhost:9999/users";
        this.registerUrl = `${this.baseUrl}/register`;
        this.loginUrl = `${this.baseUrl}/login`;
    }

    register(credentials) {
        console.log(credentials);
        return post(this.registerUrl, credentials);
    }

    login(credentials) {
        return post(this.loginUrl, credentials);
    }
}

export default UserService;