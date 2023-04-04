import axios from "axios";
import { BOOKING_SERVICE } from "../../common/Constants";
const BASE_URL = BOOKING_SERVICE + "/api/payment";

  
class PaymentService {
  createOrder(xmlData: string) {
    return axios.post(BASE_URL + "/createOrder", xmlData, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }

  capturePayment = async (encryptedData: string) => {
    return await axios.post(BASE_URL + "/capturePayment", {encryptedData: encryptedData});
  };
}

export default new PaymentService();
