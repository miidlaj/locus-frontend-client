import axios from "axios";
import { BASE_API_URL } from "../common/Constants";
import User from "../models/user";


const BASE_URL = BASE_API_URL + "/api/auth";


type resetPassType = {
    newPassword: string,
    resetPasswordToken: string
}
class AuthenticationService {

    login(user: User) {
        return axios.post(BASE_URL + '/login', user);
    }

    register(user: User) {
        return axios.post(BASE_URL + '/register', user);
    }

    verify(verificationCode: string) {
        return axios.get(BASE_URL + '/verify?verificationCode=' + verificationCode);
    }

    requestPasswordReset(email: string) {
        return axios.get(BASE_URL + '/forget?email=' + email);
    }

    resetPasswordRequest(resetPassObj: resetPassType) {
        return axios.post(BASE_URL + '/forget', resetPassObj);
    }
}

export default new AuthenticationService();