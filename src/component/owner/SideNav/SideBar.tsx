/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import logo from "../../../assests/oie_fCAaxhclGNkh.png"
import VillaIcon from '@mui/icons-material/Villa';

const SideBar = () => {
  const [open, setOpen] = React.useState(true);
  const Menus = [
    { title: "Dashboard", icon :<DashboardIcon/> },
    { title: "Resort", icon : <VillaIcon/> },
    { title: "Account", icon : <DashboardIcon/>, gap: true },
    { title: "Schedule ", icon : <DashboardIcon/> },
    { title: "Search", icon : <DashboardIcon/> },
    { title: "Analytics", icon : <DashboardIcon/> },
    { title: "Files ", icon : <DashboardIcon/>, gap: true },
    { title: "Setting", icon : <DashboardIcon/> },
  ];
  return (
    <>
  <div className="flex z-50 fixed h-full">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-teal-900 h-full p-5 pt-8 relative duration-300`}
      >

        <KeyboardDoubleArrowLeftIcon className={`absolute cursor-pointer -right-3 top-9 w-7 border-teal-900 text-black
           border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
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
            LOCUS HAUNT
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-black"
              } `}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">

      </div>
    </div>
</>

  )
}

export default SideBar