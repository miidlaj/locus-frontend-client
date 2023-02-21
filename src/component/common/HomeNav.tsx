import React, { useEffect, useState } from 'react'
import './tailwindcss.css'
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink }from 'react-router-dom'

const HomeNav = () => {

    const buttonRef = React.useRef(null);

    const dropDownRef = React.useRef(null);

    const [dropDownProfile, setDropDownProfile] = useState(false);



useEffect(() => {    
    const $targetEl = dropDownRef.current;

    const $triggerEl = buttonRef.current;

const options: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
  };
  
  const dropdown: DropdownInterface = new Dropdown($targetEl, $triggerEl, options);
   
    
  if (dropDownProfile) {
    dropdown.show();
  }else{
    dropdown.hide();
  }

}, [dropDownProfile])



const showProfileDropDown = () => {
    setDropDownProfile(!dropDownProfile)
}


  return (
    <>
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 bg-white">
   <div className="container flex flex-wrap items-center justify-between mx-auto">
     <a href="https://flowbite.com/" className="flex items-center">
       <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
         LOCUS HAUNT
       </span>
     </a>
     <div className="flex items-center md:order-2">
       <button
       onClick={showProfileDropDown}
       ref={buttonRef}
         type="button"
         className="flex mr-3 rounded-full "
         id="user-menu-button"
         aria-expanded="false"
         data-dropdown-toggle="user-dropdown"
         data-dropdown-placement="bottom"
       >
         <span className="sr-only">Open user menu</span>
         <AccountCircleRoundedIcon className='text-teal-900 hover:scale-105' fontSize='large' />
       </button>
       {/* Dropdown menu */}
       <div
         className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
         id="user-dropdown"
         ref={dropDownRef}
       >
         <div className="px-4 py-3">
           <span className="block text-sm text-gray-900 dark:text-white">
             Bonnie Green
           </span>
           <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
             name@flowbite.com
           </span>
         </div>
         <ul className="py-2" aria-labelledby="user-menu-button">
           <li>
             <a
               href="/"
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
             >
               Dashboard
             </a>
           </li>
           <li>
             <a
               href="/"
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
             >
              <ExitToAppIcon className="h-6 w-6 text-red-900" />
               Sign out
             </a>
           </li>
         </ul>
       </div>
       
       <button
         data-collapse-toggle="mobile-menu-2"
         type="button"
         className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
         aria-controls="mobile-menu-2"
         aria-expanded="false"
       >
         <span className="sr-only">Open main menu</span>
         <svg
           className="w-6 h-6"
           aria-hidden="true"
           fill="currentColor"
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             fillRule="evenodd"
             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
             clipRule="evenodd"
           />
         </svg>
       </button>
     </div>
     <div
       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
       id="mobile-menu-2"
     >
       <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-teal-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
         <li>
           <a
             href="/"
             className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-110 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
             aria-current="page"
           >
             Home
           </a>
         </li>
         <li>
           <NavLink
             to="/dashboard"
             className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-110 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
           >
             About
           </NavLink>
         </li>
         <li>
           <a
             href="/"
             className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-110 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
           >
             Services
           </a>
         </li>
         <li>
           <a
             href="/"
             className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-110 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
           >
             Pricing
           </a>
         </li>
         <li>
           <a
             href="/"
             className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-110 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
           >
             Contact
           </a>
         </li>
       </ul>
     </div>
   </div>
 </nav>
 
 
     </>
  )
}

export default HomeNav