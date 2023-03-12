import axios from "axios";
import { ROOM_SERVICE } from "../../../common/Constants";

const BASE_URL = ROOM_SERVICE + "/api/rooms";

interface Room {
  roomCode: string;
  description: string;
  roomTypeId: number;
  facilityIds: number[];
  resortId: number;
  price: number;
}
class RoomService {

  getAllRoom() {
    return axios.get(BASE_URL);
  }

  createNewRoom(newRoomObj: Room) {
    return axios.post(BASE_URL, newRoomObj);
  }

//   getResortByUser(userId: string) {
//     return axios.get(BASE_URL + "/user/" + userId);
//   }

//   getResortById(id: string | number) {
//     return axios.get(BASE_URL + "/" + id);
//   }

//   chnageResortEnableStatusById(id: string | number) {
//     return axios.put(BASE_URL + "/enable/" + id);
//   }
}

export default new RoomService();
