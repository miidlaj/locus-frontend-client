import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";
const BASE_URL = RESORT_SERVICE + "/api/resort";

type ResortFilter = {
    place: string,
    categories: number[],
    facilities: number[],
}
class ResortSearchService {

    getLocationSuggestion(query: string) {
        return axios.get(BASE_URL + "/location?query=" + query);
    }
    
    getResortWithFilter(filters: ResortFilter) {
        return axios.post(BASE_URL + "/search", filters);
    }

}

export default new ResortSearchService();