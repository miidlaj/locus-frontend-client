/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import logo from "../../../assests/oie_fCAaxhclGNkh.png"
import NotificationsIcon from "@mui/icons-material/Notifications";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import { Email, DashboardCustomize } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const Menus = [
    { title: "Dashboard", icon :<DashboardCustomize/>, link: "/dashboard" },
    { title: "Resort", icon : <ApartmentIcon/>, link: "/dashboard/resorts" },
    { title: "Profile", icon : <PersonIcon/>, gap: true , link: "/profile"},
    { title: "Notification ", icon : <NotificationsIcon/> , link: "/notification" },
    { title: "Message", icon : <Email/> , link: "/message"}
  ];

  const [activeMenu, setActiveMenu] = React.useState(0); // initialize active menu to the first item


  const handleMenuClick = (index:number) => {
    setActiveMenu(index);
  };
  return (
    <>
  <div className="hidden sm:flex z-50 fixed h-full " onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div
        className={` ${
          open ? "w-52" : "w-20 "
        } bg-teal-900 h-full p-5 pt-8 relative duration-300`}
      >

        <KeyboardDoubleArrowLeftIcon className={`absolute cursor-pointer -right-3 top-9 w-7 border-teal-900 text-black
           border-2 rounded-full  ${!open && "rotate-180"}`}/>
        <div className="flex gap-x-4 items-center">
          
          <img
          
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt='Logo'
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            LOCUS
          </h1>
        </div>
        <div className="flex flex-col justify-center h-full">
        <ul className="">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link} key={index}>
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${activeMenu === index ? 'bg-gray-800 text-white border-teal-500 border-l-4' : ''}` }
              onClick={() => handleMenuClick(index)}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}
        </ul>
        </div>
      </div>
      <div className="h-screen flex-1 p-7">

      </div>
    </div>
</>

  )
}

export default SideBar