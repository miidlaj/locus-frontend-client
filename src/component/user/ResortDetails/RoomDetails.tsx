import React from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useCacheStore from "../../../zustand/useCacheStore";
import { useNavigate } from "react-router-dom";

interface Props {
  resortId: number;
}
const RoomDetails = (props: Props) => {
  const [openDate, setOpenDate] = React.useState(false);

  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let tomorrowDate = new Date(tomorrow.getTime());

  const [date, setDate] = React.useState([
    {
      startDate: today,
      endDate: tomorrowDate,
      key: "selection",
    },
  ]);

  const { resortId } = props;

  const { setRoomCheck } = useCacheStore();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-col w-full h-auto items-center bg-dark-light text-white rounded-lg shadow hover:scale-[1.01] duration-300 transition ease-in-out pb-20">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl tracking-tight text-center ">
            Reserve a Room
          </h5>
        </div>

        <div className="mb-5 w-full h-96 flex justify-center ">
          <div className="relative">
            <div
              className="flex justify-between items-center"
              onMouseEnter={() => setOpenDate(!openDate)}
              onMouseLeave={() => setOpenDate(!openDate)}
            >
              <input
                type="text"
                className="w-full pl-4 pr-10 py-3 leading-none shadow-sm focus:outline-none bg-white text-black font-medium focus:ring-[2] focus:ring-gray-900 duration-700 transition ease-in-out"
                placeholder="Start Date"
                readOnly
                value={`${format(date[0].startDate, "dd/MM/yyyy")}`}
              />
              <div className="absolute top-0 right-1/2 px-3 py-2">
                <svg
                  className="h-6 w-6 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <p className="text-gray-900">&nbsp;-&nbsp;</p>

              <input
                type="text"
                className="w-full pl-4 pr-10 py-3 leading-none shadow-sm focus:outline-none bg-white text-black font-medium focus:ring-[2] focus:ring-gray-900 duration-700 transition ease-in-out"
                placeholder="End Date"
                readOnly
                value={`${format(date[0].endDate, "dd/MM/yyyy")}`}
              />

              <div className="absolute top-0 right-0 px-3 py-2">
                <svg
                  className="h-6 w-6 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {openDate && (
                <DateRange
                  className="absolute top-14 left-1/4"
                  onChange={(item) => {
                    const { startDate, endDate, key } = item.selection;
                    if (
                      startDate !== undefined &&
                      endDate !== undefined &&
                      key !== undefined
                    ) {
                      let selection = [
                        {
                          startDate: startDate,
                          endDate: endDate,
                          key: key,
                        },
                      ];

                      setDate(selection);
                    }
                  }}
                  minDate={new Date()}
                  
                  ranges={date}
                />
              )}
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  setRoomCheck({
                    resortId: resortId,
                    checkIn: date[0].startDate,
                    checkOut: date[0].endDate,
                  });
                  setOpenDate(!openDate);
                  navigate("/resort/rooms");
                }}
                className="btn bg-dark-emarald text-white hover:scale-105 duration-150 transition ease-in-out"
              >
                Check Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
