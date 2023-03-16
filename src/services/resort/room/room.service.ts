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

  getAllRoomByResortId(resortId: number | string) {
    return axios.get(BASE_URL+ "/resort/" + resortId);
  }

  createNewRoom(newRoomObj: Room) {
    return axios.post(BASE_URL, newRoomObj);
  }

  getRoomById(roomId: number | string) {
    return axios.get(BASE_URL+ "/" + roomId);
  }

  async changeRoomEnableStatus(roomId: number) {
    return await axios.put(BASE_URL + "/status/" + roomId);
  }
}

export default new RoomService();
