import { Route, Routes } from "react-router-dom";
import HomeNav from "../../component/common/HomeNav";
import SearchPage from "../user/SearchPage";
import NavBar from "../../component/user/NavBar";
import ResortDetailsPage from "../user/ResortDetailsPage";
import CheckRoomsPage from "../user/CheckRoomsPage";
import CheckOutPage from "../user/CheckOutPage";
import BookingPage from "../user/BookingPage";

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className=" flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
        <NavBar />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/resort/view" element={<ResortDetailsPage/>} />
          <Route path="/resort/rooms" element={<CheckRoomsPage/>} />
          <Route path="/checkout" element={<CheckOutPage/>} />
          <Route path="/bookings" element={<BookingPage/>} />

        </Routes>
      </div>
      {/* <BottomAppBar/> */}
    </div>
  );
};

export default HomePage;
