import React from "react";
import RoomModalForm from "./RoomModalForm";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import roomService from "../../../../../services/resort/room/room.service";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


interface Props {
  resortId: number;
}
const ResortRooms = (props: Props) => {
  const { resortId } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  type alertType = {
    show: boolean;
    message: string;
    type: "warning" | "info" | "error" | "success";
  };
  const [alert, setAlert] = React.useState<alertType>({
    show: false,
    message: "",
    type: "info",
  });

  type RoomType = {
    roomId: number;
    roomCode: string;
    enabled: boolean;
    roomPrice: number;
    updatedTime: number;
    roomType: string;
  };
  const [rooms, setRooms] = React.useState<RoomType[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    roomService
      .getAllRoomByResortId(resortId)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          show: true,
          type: "error",
        });
      });
  }, [modalOpen]);

  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-end items-center">
          <div className="inline-flex items-center space-x-2">
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

        {alert.show && (
          <Collapse in={true} className="pt-5">
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

        <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
            <p
              className="cursor-pointer bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </p>
            <p className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">
              Add
            </p>
          </div>

          {rooms.map((room, index) => (
            <div
              key={index}
              className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
            >
              <h4 className="text-white text-2xl font-bold capitalize text-center">
                {room.roomCode}
                &nbsp;
              </h4>
              <div className="badge badge-outline badge-ghost">
                {room.roomType}
              </div>
              <div className="card-actions justify-end absolute bottom-2">
                <div className="badge badge-info badge-ghost">
                  Price:&nbsp;{room.roomPrice}&nbsp;INR
                </div>
              </div>

              <Button variant="text" onClick={()=> {
                navigate("/dashboard/resorts/roomDetails" ,{
                  state: {
                    resortId: resortId,
                    roomId: room.roomId,
                  }
                })
              }}>View</Button>
              <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                {room.enabled ? "Enabled" : "Disabled"}&nbsp;
                {room.enabled ? (
                  <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span>
                ) : (
                  <span className="ml-2 w-2 h-2 block bg-red-500 rounded-full group-hover:animate-pulse"></span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <RoomModalForm
        modalStatus={modalOpen}
        resortId={resortId}
        setModalStatus={setModalOpen}
      />
    </>
  );
};

export default ResortRooms;
