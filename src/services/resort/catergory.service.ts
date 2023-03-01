import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";



const BASE_URL = RESORT_SERVICE + "/api/resort";

class CategoryService {

    getAllCategories() {
        return axios.get(BASE_URL + '/category');
    }

    // register(user: User) {
    //     return axios.post(BASE_URL + '/register', user);
    // }
}

export default new CategoryService();