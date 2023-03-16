import axios from "axios";
import { ROOM_SERVICE } from "../../../common/Constants";


const BASE_URL = ROOM_SERVICE + "/api/rooms";


class RoomImageService {

    async setImage(defaultImageReq: FormData) {
        return await axios.post(BASE_URL + "/image", defaultImageReq, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      async deleteImage(imageId: number, roomId: number) {
        return await axios.delete(BASE_URL + "/" + roomId + "/image/" + imageId);
      }

}

export default new RoomImageService();