import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";
const BASE_URL = RESORT_SERVICE + "/api/resort";

interface Resort {
    resortName: string,
    description: string,
    categoryId: number,
    facilityIds: number[],
    zipCode: string,
    city: string,
    state: string,
    country: string,
    userId: number,
  }
class ResortService {

    getAllResort() {
        return axios.get(BASE_URL);
    }

    createNewRersort(newResortObj: Resort) {
        return axios.post(BASE_URL , newResortObj);
    }

    getResortByUser(userId: string) {
        return axios.get(BASE_URL + "/user/" + userId);
    }

    getResortById(id: string | number) {
        return axios.get(BASE_URL + '/' + id);
    }

    chnageResortEnableStatusById(id: string | number) {
        return axios.put(BASE_URL + '/enable/' + id);
    }
}

export default new ResortService();