import axios from "axios";
import { BASE_API_URL } from "../common/Constants";
import User from "../models/user";


const BASE_URL = BASE_API_URL + "/api/auth";

class AuthenticationService {

    login(user: User) {
        return axios.post(BASE_URL + '/login', user);
    }

    register(user: User) {
        return axios.post(BASE_URL + '/register', user);
    }
}

export default new AuthenticationService();