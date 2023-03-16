import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/owner/DashBoardPage";
import Resort from "../pages/owner/Resort";
import AddResort from "../pages/owner/AddResort";
import DashNav from "../component/owner/Nav/DashNav";
import ResortDetails from "../pages/owner/ResortDetails";
import RoomDetails from "../pages/owner/RoomDetails";

const Owner = () => {
  return (
    <>
    
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
          <DashNav />
            <Routes>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/resorts" element={<Resort />} />
              <Route path="/resorts/new/:step" element={<AddResort />} />
              <Route path="/resorts/details" element={<ResortDetails />} />
              <Route path="/resorts/roomDetails" element={<RoomDetails/>} />
              <Route path="/profile" element={<DashBoardPage />} />
              <Route path="/notification" element={<DashBoardPage />} />
              <Route path="/message" element={<DashBoardPage />} />
            </Routes>
          </div>
          {/* <BottomAppBar/> */}
        </div>
      
    </>
  );
};

export default Owner;
