import React from "react";
import bookingService from "../../services/booking/booking.service";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import formatDate from "../../services/common.service";

type Booking = {
  checkInDate: number;
  checkOutDate: number;
  bookedDate: number;
  totalPrice: number;
  resortId: number;
  roomId: number;
};
const BookingPage = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [response, setResponse] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    bookingService
      .getAllBookingOfUser(currentUser.id)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Button
              variant="text"
              onClick={() => {
                navigate("/");
              }}
              startIcon={<ArrowBackIosIcon />}
            >
              Home
            </Button>
            <h3 className="ml-5 text-3xl font-extralight ">Bookings</h3>
          </div>

          <div className="inline-flex items-center space-x-2 justify-end">
            <a
              className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </a>
            <a
              className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-5">
          {response.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 w-full mx-auto border border-white bg-white"
            >
              {/* <div className="w-full md:w-1/3 bg-white grid place-items-center">
      <img
        src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="tailwind logo"
        className="rounded-xl"
      />
    </div> */}
              <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div className="flex justify-between item-center">
                  <p className="text-gray-500 font-medium hidden md:block">
                    # {item.roomId}
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-600 font-bold text-sm ml-1">
                      Resort: {item.resortId}
                    </p>
                  </div>

                 
                </div>
                <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                  {formatDate(new Date(item.bookedDate))}
                </h3>
                <p className="md:text-lg text-gray-500 text-base">
                  Booked from {formatDate(new Date(item.checkInDate))} to{" "}
                  {formatDate(new Date(item.checkOutDate))}
                </p>
                <p className="text-xl font-black text-gray-800">
                  ₹ &nbsp; {item.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
