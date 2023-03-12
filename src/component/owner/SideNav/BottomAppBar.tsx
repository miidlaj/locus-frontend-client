import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import { Email, DashboardCustomize } from "@mui/icons-material";
import { Link } from "react-router-dom";


function BottomAppBar() {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <section
      id="bottom-navigation"
      className="sm:hidden  md:hidden xl:hidden lg:hidden fixed inset-x-0 bottom-0 z-10 bg-teal-900 text-white shadow"
    >
      <div id="tabs" className="flex justify-between">
        <Link
          to={"/dashboard"}
          className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 transform transition duration-75 ease-linear ${
            activeTab === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <DashboardCustomize className="inline-block mb-1 h-7 " />
          <span className="tab tab-home block text-xs">Dashboard</span>
        </Link>
        <Link
          to={"/dashboard/resorts"}
          className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 transform transition duration-75 ease-linear ${
            activeTab === "resort" ? "active" : ""
          }`}
          onClick={() => setActiveTab("resort")}
        >
          <ApartmentIcon className="inline-block mb-1 h-7 " />
          <span className="tab tab-kategori block text-xs">Resort</span>
        </Link>
        <Link
          to={"/profile"}
          className={`w-full focus:text-teal-500 justify-center inline-block text-center pt-2 pb-1 hover:scale-110 transform transition duration-75 ease-linear ${
            activeTab === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <PersonIcon className="inline-block mb-1 h-7 " />
          <span className="tab tab-explore block text-xs">Profile</span>
        </Link>
        <Link
          to={"/notification"}
          className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 transform transition duration-75 ease-linear ${
            activeTab === "notification" ? "active" : ""
          }`}
          onClick={() => setActiveTab("notification")}
        >
          <NotificationsIcon className="inline-block mb-1 h-7 " />
          <span className="tab tab-whishlist block text-xs">Notification</span>
        </Link>
        <Link
          to={"/message"}
          className={`w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 transform transition duration-75 ease-linear ${
            activeTab === "message" ? "active" : ""
          }`}
          onClick={() => setActiveTab("message")}
        >
          <Email className="inline-block mb-1 h-7 " />
          <span className="tab tab-account block text-xs">Message</span>
        </Link>
      </div>
    </section>
  );
}

export default BottomAppBar;
