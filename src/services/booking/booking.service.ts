import axios from "axios";
import { BOOKING_SERVICE } from "../../common/Constants";


const BASE_URL = BOOKING_SERVICE + "/api/bookings";



class BookingService {

    getAllBookingOfUser(userId: string | number) {
        return axios.get(BASE_URL + '/user/' + userId);
    }

    
}

export default new BookingService();