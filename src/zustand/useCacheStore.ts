import create from "zustand";

type Facility = {
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};


// Resort Details
interface ResortAddress {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}
interface LocationDetails {
  id: number;
  location: string;
  longitude: number;
  lattitude: number;
}

type ResortDetails = {
  id: number;
  name: string;
  description: string;
  defaultImageLink: string;
  category: string;
  facilities: string[];
  resortAddress: ResortAddress;
  locationDetails: LocationDetails;
}


// Resort Check Rooms

type RoomCheck ={ 
  resortId: number;
  checkIn: Date;
  checkOut: Date;
}

// Room Checkout



interface ImageType {
  id: number;
  originalImageLink: string;
  resizedImageLink: string;
}

interface RoomType {
  id: number;
  roomCode: string;
  description: string;
  price: number;
  roomFacilities: Facility[];
  images: ImageType[];
  roomType: string;
}

type checkOutRoom = {
  rooms: RoomType[];
  checkIn: Date;
  checkOut: Date;
  resortId: number;
}

// Alert

type AlertType = {
  show: boolean;
  message: string;
  type: "warning" | "info" | "error" | "success";
};


type CacheStore = {
  facilities: Facility[];
  categories: Category[];
  resortDetails: ResortDetails;
  roomCheck: RoomCheck;
  checkoutRoom: checkOutRoom;
  alert: AlertType;
  setAlert: (alert: AlertType) => void;
  setCheckoutRoom: (checkoutRoom: checkOutRoom) => void;
  setResortDetails: (resortDetails:ResortDetails) => void;
  setRoomCheck: (roomCheck:RoomCheck) => void;
  setFacilities: (facilities: Facility[]) => void;
  setCategories: (categories: Category[]) => void;
  clearCache: () => void;
};

const useCacheStore = create<CacheStore>((set) => ({
  facilities: [],
  categories: [],
  resortDetails: {id: 0, name: '', description: '', category: '', facilities: [], defaultImageLink: '', locationDetails: {id: 0, lattitude: 0, location: '', longitude:0}, resortAddress: {id: 0, city:'', state: '',country: '', zipCode: ''}},
  roomCheck: {resortId: 0, checkIn: new Date(), checkOut: new Date()},
  checkoutRoom: {checkIn: new Date(),checkOut: new Date(),resortId: 0, rooms:[]},
  alert: {show: false, message: '', type: 'warning'},
  setAlert: (alert) => set({alert}),
  setCheckoutRoom: (checkoutRoom) => set({checkoutRoom}),
  setResortDetails: (resortDetails) => set({resortDetails}),
  setRoomCheck: (roomCheck) => set({roomCheck}),
  setFacilities: (facilities) => set({ facilities }),
  setCategories: (categories) => set({ categories }),
  clearCache: () => set({ facilities: [], categories: [],roomCheck: {resortId: 0, checkIn: new Date(), checkOut: new Date()} , resortDetails: {id: 0, name: '', description: '', category: '', facilities: [], defaultImageLink: '', locationDetails: {id: 0, lattitude: 0, location: '', longitude:0}, resortAddress: {id: 0, city:'', state: '',country: '', zipCode: ''}} }),
}));

export default useCacheStore;