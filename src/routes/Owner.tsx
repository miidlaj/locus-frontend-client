import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/owner/DashBoardPage";
import SideBar from "../component/owner/SideNav/SideBar";
import BottomAppBar from "../component/owner/SideNav/BottomAppBar";
import NavBar from "../component/owner/SideNav/NavBar";
import Resort from "../pages/owner/Resort";
import AddResort from "../pages/owner/AddResort";

const Owner = () => {
  return (
    <>
    {/* <CHatGptTest/> */}
    
    <SideBar/> 
    <NavBar/>     
      <div className="sm:ml-32 sm:mt-5 ">
        <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/resorts" element={<Resort />} />
            <Route path="/resorts/new/:step" element={<AddResort/>} />
        </Routes>
      </div>
    <BottomAppBar/>
    </>
  );
};

export default Owner;
