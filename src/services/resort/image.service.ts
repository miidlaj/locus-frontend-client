import axios from "axios";
import { RESORT_SERVICE } from "../../common/Constants";
const BASE_URL = RESORT_SERVICE + "/api/resort";

class ResortImageService {
  async setDefaultImage(defaultImageReq: FormData) {
    return await axios.post(BASE_URL + "/defaultImage", defaultImageReq, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async setExtraImage(extraImageObj: FormData) {
    return await axios.post(BASE_URL + "/extraImage", extraImageObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new ResortImageService();
