import React from "react";
import roomService from "../../services/resort/room/room.service";
import { useLocation, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Chip, Grid, Switch } from "@mui/material";
import formatDate from "../../services/common.service";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import RoomImageDetails from "../../component/owner/resort/resortDetails/rooms/RoomImageDetails";
import { RoomStatusType } from "../../component/owner/resort/RoomStatusType";

const RoomDetails = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  const resortId = location.state?.resortId;

  const navigate = useNavigate();

  type facility = {
    id: number;
    name: string;
    description: string;
  };
  type roomType = {
    id: number;
    name: string;
  };
  type roomImage = {
    id: number;
    originalImageLink: string;
    resizedImageLink: string;
  };
  type Room = {
    createdTime: number | string;
    description: string;
    enabled: boolean;
    facilities: facility[];
    resortId: number;
    roomCode: string;
    roomId: number;
    roomImages: roomImage[];
    roomPrice: number;
    roomType: roomType;
    updatedTime: number | string;
    roomCreateStatus: string;
  };

  const imageDeleteHandler = (imageId: number) => {
    if (room !== undefined) {
      let obj: Room = room;
      obj.roomImages = obj.roomImages.filter((e) => e.id !== imageId);
      if (obj.roomImages.length < 3) {
        obj.enabled = false;
        obj.roomCreateStatus = RoomStatusType.FORM_COMPLETED;
      }
      setRoom(obj);
    }
  };

  const imageUploadHandler = (images: roomImage[]) => {
    if (room !== undefined) {
      let obj: Room = room;
      obj.roomImages = images;
      if (images.length >= 3) {
        obj.enabled = true;
        obj.roomCreateStatus = RoomStatusType.IMAGES_ADDED;
      }
      setRoom(obj);
    }
  };

  const changeEnabledStatus = async (roomId: number) => {
    await roomService
      .changeRoomEnableStatus(roomId)
      .then((response) => {
        setAlert({
          show: true,
          message: response.data,
          type: "success",
        });
        if (room !== undefined) {
          let obj: Room = room;
          obj.enabled = !room?.enabled;
          setRoom(obj);
        }
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: error.response.data,
          type: "error",
        });
      });
  };
  const [room, setRoom] = React.useState<Room>();

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

  React.useEffect(() => {
    console.log(resortId);
    console.log(roomId);

    if (roomId === undefined) {
      navigate("/dashboard/resorts");
    }
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    await roomService
      .getRoomById(roomId)
      .then((response) => {
        let obj: Room = response.data;

        const createdDateObj = new Date(obj.createdTime);
        const createdDate = formatDate(createdDateObj);

        const updatedDateObj = new Date(obj.updatedTime);
        const updatedDate = formatDate(updatedDateObj);

        obj.createdTime = createdDate;
        obj.updatedTime = updatedDate;

        setRoom(obj);
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: error.response.data,
          type: "error",
        });
      });
  };

  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  type TabContentProps = {
    value: number;
  };
  function TabsContent(props: TabContentProps) {
    const { value } = props;
    switch (value) {
      case 0:
        return (
          <>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Line Overview*/}
                  <div className="flex items-center py-4">
                    <div className="flex-grow h-[0.3px] bg-highlight"></div>

                    <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
                      Overview
                    </span>

                    <div className="flex-grow h-[0.3px] bg-highlight"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Room Code:{"         "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">{room?.roomCode}</span>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Resort Id:{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">{room?.resortId}</span>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Description:{" "}
                    </div>
                    <div
                      className="font-mono font-light text-gray-500 w-[28rem]"
                      dangerouslySetInnerHTML={{
                        __html: room?.description || "",
                      }}
                    ></div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Create Status:{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">
                        {room?.roomCreateStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Enable/Disable:{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <Switch
                        {...label}
                        checked={room?.enabled}
                        color="success"
                        onClick={() => {
                          if (
                            room?.roomCreateStatus ===
                            RoomStatusType.IMAGES_ADDED
                          ) {
                            changeEnabledStatus(roomId);
                          } else {
                            setAlert({
                              message:
                                "You cannot enable room. Upload images for enabling room.",
                              show: true,
                              type: "warning",
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {/* Line Extras*/}
                  <div className="flex items-center py-4">
                    <div className="flex-grow h-[0.3px] bg-highlight"></div>

                    <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
                      Extras
                    </span>

                    <div className="flex-grow h-[0.3px] bg-highlight"></div>
                  </div>

                  <div className="flex mt-5 items-center justify-between ">
                    <div className="inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2 w-full">
                      Facilities:
                      <div className="flex flex-wrap gap-2 my-5">
                        {room?.facilities.map((facility, index) => (
                          <Chip
                            size="medium"
                            clickable
                            key={index}
                            label={facility.name}
                            color="info"
                            sx={{
                              fontSize: "16px",
                              padding: "16px",
                            }}
                            variant="outlined"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Room Type:{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">{room?.roomType.name}</span>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Created :{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">{room?.createdTime}</span>
                    </div>
                  </div>

                  <div className="flex mt-5 items-center justify-between">
                    <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
                      Updated :{" "}
                    </div>
                    <div className="font-mono font-light text-gray-500 w-[28rem]">
                      <span className="font-bold">{room?.updatedTime}</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <RoomImageDetails
              imageDeleteHandler={imageDeleteHandler}
              imageUploadHandler={imageUploadHandler}
              roomId={room?.roomId !== undefined ? room.roomId : 0}
              roomImages={room?.roomImages !== undefined ? room.roomImages : []}
            />
          </>
        );
      default:
        return (
          <>
            <div>Error</div>;{" "}
          </>
        );
    }
  }

  const label = { inputProps: { "aria-label": "Switchs" } };
  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-start items-center">
          <Button
            variant="text"
            onClick={() => {
              navigate("/dashboard/resorts/details", {
                state: {
                  resortId: resortId,
                  tabNumber: 3,
                },
              });
            }}
            startIcon={<ArrowBackIosIcon />}
          >
            BACK
          </Button>
          <h3 className="ml-5 text-3xl font-extralight text-white/50">
            Room Details
          </h3>
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

        <div className="my-10">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab
                sx={{
                  color: "rgb(255 255 255 / 0.5)",
                }}
                value={0}
                label="GENERAL"
              />
              <Tab
                sx={{
                  color: "rgb(255 255 255 / 0.5)",
                }}
                value={1}
                label="IMAGES"
              />
            </Tabs>
          </Box>

          <TabsContent value={tab} />
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
