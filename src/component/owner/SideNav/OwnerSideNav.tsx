/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Dropdown, DropdownInterface, DropdownOptions } from "flowbite";


const OwnerSideNav = () => {

//   const buttonRef = React.useRef(null);

//   const dropDownRef = React.useRef(null);

//   const [dropDownProfile, setDropDownProfile] = React.useState(false);



// React.useEffect(() => {    
//   const $targetEl = dropDownRef.current;

//   const $triggerEl = buttonRef.current;

// const options: DropdownOptions = {
//   placement: 'bottom',
//   triggerType: 'click',
//   offsetSkidding: 0,
//   offsetDistance: 10,
//   delay: 3000,
// };

// const dropdown: DropdownInterface = new Dropdown($targetEl, $triggerEl, options);
 
  
// if (dropDownProfile) {
//   dropdown.show();
// }else{
//   dropdown.hide();
// }

// }, [dropDownProfile])



// const showProfileDropDown = () => {
//   setDropDownProfile(!dropDownProfile)
// }

  return (
    <>
    
    <nav className="fixed top-0 z-50 w-full bg-transparent ">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-end">
      <div className="flex items-center">
        <div className="flex items-center ml-3">
          <div>
            <button
              type="button"
              // onClick={showProfileDropDown}
              // ref={buttonRef}
              className="flex text-sm "
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <span className="sr-only">Open user menu</span>
              <AccountCircleRoundedIcon className='text-teal-900 hover:scale-105' fontSize='large' />
            </button>
          </div>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user"
            // ref={dropDownRef}
          >
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                Neil Sims
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                neil.sims@flowbite.com
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

    </>
  );
};

export default OwnerSideNav;
