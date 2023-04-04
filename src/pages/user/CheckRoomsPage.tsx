import React from "react";
import useCacheStore from "../../zustand/useCacheStore";

import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import resortSearchService from "../../services/search/resortSearch.service";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../component/common/Loading";

type Facility = {
  id: number;
  name: string;
  description: string;
};

interface ImageType {
  id: number;
  originalImageLink: string;
  resizedImageLink: string;
}

interface RoomType {
  id: number;
  roomCode: string;
  description: string;
  price: number;
  roomFacilities: Facility[];
  images: ImageType[];
  roomType: string;
}
const CheckRoomsPage = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = React.useState<RoomType[]>([]);
  const [selected, setSelected] = React.useState<RoomType>();

  const [added, setAdded] = React.useState<RoomType[]>([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const { setCheckoutRoom, roomCheck, setRoomCheck, alert, setAlert } =
    useCacheStore();

  React.useEffect(() => {
    var total = added.reduce(function (prev, current) {
      return prev + +current.price;
    }, 0);

    setTotalAmount(total);
  }, [added]);

  const [modal, setModal] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState([
    {
      startDate: roomCheck.checkIn,
      endDate: roomCheck.checkOut,
      key: "selection",
    },
  ]);

  React.useEffect(() => {
    if (roomCheck.resortId === 0) {
      navigate("/search");
    } else {
    }
  }, [navigate, roomCheck, roomCheck.resortId]);

  const handleCheck = async () => {
    setLoading(true);
    const roomCheckObj = {
      resortId: roomCheck.resortId,
      checkIn: date[0].startDate,
      checkOut: date[0].endDate,
    };
    setRoomCheck(roomCheckObj);
    await resortSearchService
      .getRoomWithAvailability(roomCheckObj)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        setAlert({
          show: true,
          type: "error",
          message: "Cannot load room at the moment. Please try again.",
        });
      });

    setLoading(false);
  };

  const handleCheckout = () => {
    setCheckoutRoom({
      checkIn: date[0].startDate,
      checkOut: date[0].endDate,
      resortId: roomCheck.resortId,
      rooms: added,
    });

    navigate("/checkout");
  };

  return (
    <>
      {loading && <Loading title="Checking Availability..." />}

      {alert.show && (
        <Collapse in={alert.show} className="relative mt-5">
          <Alert
            severity={alert.type}
            action={
              <IconButton
                aria-label="close"
                color={alert.type}
                size="small"
                onClick={() => {
                  setAlert({
                    message: "",
                    show: false,
                    type: "info",
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        </Collapse>
      )}

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        checked={modal}
        defaultChecked={false}
        id="my-modal-6"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selected?.roomCode}</h3>
          <p className="py-4">{selected?.description}</p>

          <div className="">
            <div className="carousel carousel-center w-auto p-4 space-x-4 bg-neutral rounded-box ">
              {selected?.images.map((image, index) => (
                <div key={index} className="carousel-item h-96 w-auto">
                  <img
                    src={image.originalImageLink}
                    alt=""
                    className="rounded-box"
                  />
                </div>
              ))}
            </div>
            <div className="modal-action">
              <label
                htmlFor="my-modal-6"
                onClick={() => {
                  setModal(false);
                }}
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2 sm:px-0 min-h-screen text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Button
              variant="text"
              onClick={() => {
                navigate("/resort/view");
              }}
              startIcon={<ArrowBackIosIcon />}
            >
              BACK
            </Button>
            <h3 className="ml-5 text-3xl font-extralight ">
              Room Availability
            </h3>
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

        <div className="mt-14">
          <div className="mb-5 w-full h-auto flex justify-center ">
            <div className="relative">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  className="w-full pl-4 pr-10 py-3 leading-none shadow-sm focus:outline-none bg-white text-black font-medium focus:ring-[2] focus:ring-gray-900 duration-700 transition ease-in-out"
                  placeholder="Start Date"
                  readOnly
                  value={`${format(date[0].startDate, "dd/MM/yyyy")}`}
                  onClick={() => setOpenDate(!openDate)}
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
                  onClick={() => setOpenDate(!openDate)}
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
                    className="absolute top-14 left-1/4 z-50"
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
                    handleCheck();
                  }}
                  disabled={loading}
                  className="btn bg-dark-emarald text-white hover:scale-105 duration-150 transition ease-in-out"
                >
                  Check Rooms
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-10 flex-wrap">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="w-1/4 bg-transparent antialiased text-gray-900"
              >
                <div>
                  <img
                    src={room.images[0].originalImageLink}
                    alt="imgee"
                    className="w-full object-cover object-center rounded-lg shadow-md hover:z-20 relative transition duration-300 ease-in-out hover:scale-105"
                  />
                  <div className="relative px-4 -mt-16 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-baseline">
                        <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                          {room.roomType}
                        </span>
                        <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                          {room.roomFacilities.map((fac, index) => (
                            <span key={fac.id}>{fac.name}&nbsp;•</span>
                          ))}
                        </div>
                      </div>
                      <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                        {room.roomCode}
                      </h4>
                      <div className="mt-1">
                        INR {room.price}
                        <span className="text-gray-600 text-sm"> /night</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-teal-600 text-md font-semibold">
                          4/5 ratings{" "}
                        </span>
                        <span className="text-sm text-gray-600">
                          (based on 234 ratings)
                        </span>
                      </div>

                      <div className="flex justify-end mt-5">
                        <div className="btn-group">
                          {added.includes(room) && (
                            <button
                              onClick={() => {
                                setAdded((prev) =>
                                  prev.filter((x) => x !== room)
                                );
                              }}
                              className="btn border-none hover:bg-dark-teal bg-gray-900"
                            >
                              Remove
                            </button>
                          )}

                          {!added.includes(room) && (
                            <button
                              onClick={() => {
                                if (!added.includes(room)) {
                                  setAdded(added.concat(room));
                                }
                              }}
                              className="btn border-none hover:bg-dark-teal bg-gray-900"
                            >
                              Add
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setSelected(room);
                              setModal(true);
                            }}
                            className="btn border-none bg-dark-teal hover:bg-gray-900"
                          >
                            More...
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl fixed right-0 top-1/4 z-10">
        <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-dark-teal left-4 -top-6">
          {/* svg  */}
          <ShoppingCartIcon />
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">Selected</p>
          <div className="flex space-x-2 text-gray-400 text-sm">
            {added.length === 0 && <p>Empty</p>}
          </div>
          <div className="flex space-x-2 text-gray-900 text-sm my-3 font-semibold">
            {added.map((item, index) => (
              <p key={index}>{item.roomCode},</p>
            ))}
          </div>
          <div className="border-t-2 " />
          <div className="flex justify-between">
            <button
              disabled={added.length === 0}
              onClick={() => {
                handleCheckout();
              }}
              className="btn border-none hover:bg-gray-900 bg-dark-teal my-2"
            >
              Checkout
            </button>

            <div className="my-2">
              <p className="font-semibold text-base mb-2">Total</p>
              <div className="text-base text-gray-900 font-semibold">
                <p>INR {totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckRoomsPage;
