import axios from "axios";
import { RESORT_SERVICE, ROOM_SERVICE } from "../../common/Constants";

import { format } from 'date-fns';

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

    getResortDetailsForUser(resortId: number | string) {
        return axios.get(BASE_URL + "/detail/" + resortId);
    }

    getRoomWithAvailability(details: any) {
        return axios.get(ROOM_SERVICE + "/api/rooms/availability/" + details.resortId + "/" + format(details.checkIn, 'yyyy-MM-dd') + "/" + format(details.checkOut, 'yyyy-MM-dd'));
    }

}

export default new ResortSearchService();