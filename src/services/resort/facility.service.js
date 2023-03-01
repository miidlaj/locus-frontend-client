import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";



const BASE_URL = RESORT_SERVICE + "/api/resort";

class FacilityService {

    getAllFacilities() {
        return axios.get(BASE_URL + '/facility');
    }

    // register(user: User) {
    //     return axios.post(BASE_URL + '/register', user);
    // }
}

export default new FacilityService();