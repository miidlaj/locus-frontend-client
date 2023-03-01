import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";
const BASE_URL = RESORT_SERVICE + "/api/resort";


interface Location {
    resortId:string,
    latitude: number;
    longitude: number;
    location: string;
  }
class ResortLocation {
    setLocationForResort(locationObj: Location) {
        return axios.post(BASE_URL + "/locationDetails" , locationObj);
    }
}

export default new ResortLocation();