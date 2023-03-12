import {
  Checkbox,
  Chip,
  Grid,
  Switch,
  Tooltip,
  Zoom,
} from "@mui/material";
import React from "react";

import BlockIcon from "@mui/icons-material/Block";
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

type facilityType = {
  id: number;
  name: string;
  description: string;
};

type ImageType = {
  id: number;
  originalImageLink: string;
  resizedImageLink: string;
};
type resortType = {
  name: string;
  description: string;
  userId: number;
  defaultImageLink: string;
  resortCreateStatus: string;
  enabled: boolean;
  category: {
    id: number;
    name: string;
    description: string;
  };
  facilities: facilityType[];
  resortAddress: {
    id: number;
    zipCode: number;
    city: string;
    state: string;
    country: string;
  };
  images: ImageType[];
  createdTime: number | string;
  updatedTime: number | string;
  banned: boolean;
  adminApproved: boolean;
  locationDetails: {
    id: 1;
    location: string;
    lattitude: string;
    longitude: string;
  };
};
interface PropsType {
  resortDetails: resortType | undefined;
  handleChangeEnableStatus: () => void;
}
const GeneralDetails = (props: PropsType) => {

  const { resortDetails, handleChangeEnableStatus} = props;

  const label = { inputProps: { "aria-label": "Switchs" } };
  
  return (
    
      <Grid container spacing={2} paddingTop={5}>
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
              Name:{"         "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{resortDetails?.name}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              User Id:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{resortDetails?.userId}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Description:{" "}
            </div>
            <div
              className="font-mono font-light text-gray-500 w-[28rem]"
              dangerouslySetInnerHTML={{
                __html: resortDetails?.description || "",
              }}
            ></div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Create Status:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">
                {resortDetails?.resortCreateStatus}
              </span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Enabled Status:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <Switch
                {...label}
                checked={resortDetails?.enabled}
                color="success"
                onClick={handleChangeEnableStatus}
              />
            </div>
          </div>

          {/* Line Address*/}
          <div className="flex items-center py-4">
            <div className="flex-grow h-[0.3px] bg-highlight"></div>

            <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
              Address
            </span>

            <div className="flex-grow h-[0.3px] bg-highlight"></div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Zip Code:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">
                {resortDetails?.resortAddress?.zipCode}
              </span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              City:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">
                {resortDetails?.resortAddress?.city}
              </span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              State:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">
                {resortDetails?.resortAddress?.state}
              </span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Country:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">
                {resortDetails?.resortAddress?.country}
              </span>
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
                {resortDetails?.facilities.map((facility, index) => (
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
              Category:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{resortDetails?.category.name}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Approved:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <MaterialUISwitch sx={{ m: 1 }} checked={resortDetails?.adminApproved} onClick={()=> {}
              } />
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Ban:{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              
              <Tooltip
                title={resortDetails?.banned ? "Banned. Contact us for support." : "Not Banned"}
                TransitionComponent={Zoom}
                arrow
                placement="right"
              >
                <Checkbox
                  {...label}
                  icon={<BlockIcon />}
                  checked={resortDetails?.banned}
                  onClick={()=>{}}
                  checkedIcon={<BlockIcon color="error" />}
                />
              </Tooltip>

            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Created :{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{resortDetails?.createdTime}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Updated :{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <span className="font-bold">{resortDetails?.updatedTime}</span>
            </div>
          </div>

          <div className="flex mt-5 items-center justify-between">
            <div className="font-semibold inline-block font-mono whitespace-nowrap px-2 py-1 rounded text-white/75 bg-gray-900 rounded-2">
              Image :{" "}
            </div>
            <div className="font-mono font-light text-gray-500 w-[28rem]">
              <img src={resortDetails?.defaultImageLink} alt="Default" className="w-1/3 rounded-md" />
            </div>
          </div>
        </Grid>
      </Grid>
  );
};

export default GeneralDetails;
