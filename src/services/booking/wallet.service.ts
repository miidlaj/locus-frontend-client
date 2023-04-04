import axios from "axios";
import { BOOKING_SERVICE } from "../../common/Constants";

const BASE_URL = BOOKING_SERVICE + "/api/wallet";

class WalletService {

    getWalletAndTransactions(userId: number) {
        return axios.get(BASE_URL + '/' + userId);
    }

}

export default new WalletService();