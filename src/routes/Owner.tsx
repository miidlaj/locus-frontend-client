import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/owner/DashBoardPage";
import OwnerSideNav from "../component/owner/SideNav/OwnerSideNav";
import SideBar from "../component/owner/SideNav/SideBar";

const Owner = () => {
  return (
    <>
    <OwnerSideNav/>
    <div className="flex">   
      <SideBar/> 
      <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/resorts" element={<div>Hotel</div>} />
      </Routes>
    </div>
    </>
  );
};

export default Owner;
