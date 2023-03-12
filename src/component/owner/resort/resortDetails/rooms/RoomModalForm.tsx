import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React from "react";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import roomFacilityService from "../../../../../services/resort/room/roomFacility.service";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import roomTypeService from "../../../../../services/resort/room/roomType.service";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import roomService from "../../../../../services/resort/room/room.service";
import { useNavigate } from "react-router-dom";

interface AddRoomFormValues {
  roomCode: string;
  description: string;
  roomTypeId: number;
  facilityIds: number[];
  resortId: number;
  price: number;
}

interface Props {
  resortId: number;
  modalStatus: boolean
  setModalStatus: (a: boolean) => void;
}
const RoomModalForm = (props: Props) => {
  const { resortId, modalStatus, setModalStatus } = props;
  const [step, setStep] = React.useState(0);
 

  const [roomFormValues, setRoomFormValues] = React.useState<AddRoomFormValues>(
    {
      roomCode: "",
      description: "",
      facilityIds: [],
      roomTypeId: 0,
      price: 0,
      resortId: resortId,
    }
  );

  type AddRoomStepsProps = {
    step: number;
  };

  const roomTypeHandler = (roomTypeId: number) => {
    setRoomFormValues((prevState) => ({
      ...prevState,
      roomTypeId: roomTypeId,
    }));
  };

  const facilityHandler = (values: number[]) => {    
    setRoomFormValues((prevState) => ({
      ...prevState,
      facilityIds: values,
    }));
  };

  React.useEffect(() => {
    fetchFacilities();
    fetchRoomTypes();    
  }, [])
  

  //Facility And Cat 
  interface Facility {
    id: number;
    name: string;
    description: string;
  }
  interface RoomType {
    id: number;
    name: string;
  }
  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [roomTypes, setRoomTypes] = React.useState<RoomType[]>([]);

  type alertType = {
    show: boolean;
    message: string;
    buttonHandler: () => void;
    btnName: string;
  };
  const [alert, setAlert] = React.useState<alertType>({
    show: false,
    message: "",
    buttonHandler: () => {},
    btnName: "",
  });

  const [selectedChips, setSelectedChips] = React.useState(roomFormValues.facilityIds);

  React.useEffect(() => {
    facilityHandler(selectedChips)
  }, [selectedChips])
  
  const handleChipClick = (facility: Facility) => {   
    if (selectedChips.some((selectedChip) => selectedChip === facility.id)) {      
      setSelectedChips((prevSelectedChips) =>
        prevSelectedChips.filter((selectedChip) => selectedChip !== facility.id)
      );   
      facilityHandler(selectedChips);   
    } else {      
      setSelectedChips((prevSelectedChips) => [
        ...prevSelectedChips,
        facility.id,
      ]);   
    }
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    if (typeof event.target.value === "string") {
      roomTypeHandler(parseInt(event.target.value));
    } else if (typeof event.target.value === "number") {
      roomTypeHandler(event.target.value);
    }
  };

  const fetchRoomTypes = async () => {
    await roomTypeService
      .getRoomTypeList()
      .then((response) => {
        setRoomTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          show: true,
          message: "Cannot load room types",
          buttonHandler: fetchRoomTypes,
          btnName: "Retry",
        });
      });
  };

  const fetchFacilities = async () => {
    await roomFacilityService
      .getFacilityList()
      .then((response) => {
        setFacilities(response.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          show: true,
          message: "Cannot load Facilities.",
          buttonHandler: fetchFacilities,
          btnName: "Retry",
        });
      });
  };


  const navigate = useNavigate();
  const validateHandler = async () => {
    console.log(roomFormValues.facilityIds);
    if (roomFormValues.roomTypeId === 0) {
      setAlert({
        message:"Select an room Type",
        show: true,
        btnName: "Close",
        buttonHandler: () => { setAlert({buttonHandler: ()=> {}, message: '', show: false, btnName: "",})}
      });
    } else if (roomFormValues.facilityIds.length === 0) {
      setAlert({
        message:"Select Room Facilities",
        show: true,
        btnName: "Close",
        buttonHandler: () => { setAlert({buttonHandler: ()=> {}, message: '', show: false, btnName: "",})}
      });
    } else {
      console.log("Here");
      
      await roomService.createNewRoom(roomFormValues)
      .then((response) => {
        navigate("/dashboard/resorts/room/details")

      }).catch((error) => {
        console.log(error.response);
        setAlert({
          btnName:"retry",
          buttonHandler: validateHandler,
          show: true,
          message: error.response
        });
      })
    }
  }

  // First Form

  const detailsSchema = z.object({
    roomCode: z
      .string()
      .min(1, "Room Code is required")
      .min(3, "Room Code must have min 3 characters"),
    price: z
      .string()
      .min(1, "Price is required."),
    description: z
      .string()
      .min(1, "Description is required")
      .min(3, "Description must have min 15 characters")
      .max(1024, "Description cannot have more than 1024 characters")
      });

      type FormSchemaType = z.infer<typeof detailsSchema>;

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormSchemaType>({
        resolver: zodResolver(detailsSchema),
      });
    
      const [priceError, setPriceError] = React.useState('')
      const handleFormValues: SubmitHandler<FormSchemaType> = (data) => {    
        const price = parseFloat(data.price);
        if (price < 100) {
          setPriceError("Minimun amount is 100.")
        } else {
          setPriceError("");
          setRoomFormValues({
            ...roomFormValues,
            roomCode: data.roomCode,
            price: price,
            description: data.description
          });
          setStep(1);
        }
      }

  function AddRoomSteps(props: AddRoomStepsProps) {
    // const { step } = props;

    switch (step) {
      case 0:
        return (
          <>
            <div className="modal-box bg-gray-900">
              <h3 className="font-bold text-lg mb-5">
                Room Details &nbsp;<span className="text-sm">Step 1</span>
              </h3>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100%" },
                  "& .MuiInput-root": {
                    borderBottom:
                      "0.5px solid rgb(255 255 255 / 0.5) !important",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Room Code"
                  variant="standard"
                  {...register("roomCode")}
                  helperText={errors.roomCode?.message}
                  error={errors.roomCode && true}
                  rows={4}
                  InputLabelProps={{
                    style: { color: "rgb(255 255 255 / 0.75)" },
                  }}
                  InputProps={{
                    style: { color: "rgb(255 255 255)" },
                  }}
                />

                <TextField
                  id="standard-number"
                  label="Price"
                  type="number"
                  defaultValue={100.00}
                  {...register("price")}
                  helperText={errors.price?.message || priceError}
                  error={(errors.price || priceError !== '') && true}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "rgb(255 255 255 / 0.75)" },
                  }}
                  InputProps={{
                    style: { color: "rgb(255 255 255)" },
                  }}
                  variant="standard"
                />

                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  {...register("description")}
                  helperText={errors.description?.message}
                  error={errors.description && true}
                  variant="standard"
                  InputLabelProps={{
                    style: { color: "rgb(255 255 255 / 0.75)" },
                  }}
                  InputProps={{
                    style: { color: "rgb(255 255 255)" },
                  }}
                />
              </Box>

              <div className="modal-action">
              <button
                  className="btn btn-md bg-white/75 text-gray-900 hover:bg-gray-900 hover:text-white/75"
                  disabled={isSubmitting}
                  onClick={() => {setModalStatus(false)}}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-md bg-white/75 text-gray-900 hover:bg-gray-900 hover:text-white/75"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleFormValues)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
           <div className="modal-box bg-gray-900">
        <h3 className="font-bold text-lg mb-5">
          Facilities & Type &nbsp;<span className="text-sm">Step 2</span>
        </h3>

        {alert.show && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    alert.buttonHandler();
                  }}
                >
                  {alert.btnName}
                </Button>
              }
            >
              {alert.message}
            </Alert>
          </Stack>
        )}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="text-sm font-semibold text-white tracking-wide">
            Room Type
          </div>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              <span className="text-white">Select</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={roomFormValues.roomTypeId}
              label="Select"
              variant="outlined"
              color="primary"
              sx={{
                width: "100%",
                "& .MuiSelect-select": {
                  color: "rgb(255 255 255 / 0.75)",
                },
              }}
              onChange={handleChange}
              className="w-[440px] text-white border-white focus:outline-white"
            >
              <MenuItem value={0}>SELECT ROOM TYPE</MenuItem>

              {roomTypes.map((roomType) => (
                <MenuItem
                  className="text-white"
                  key={roomType?.id}
                  value={roomType?.id}
                >
                  {roomType?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="text-sm font-semibold text-white tracking-wide">
            Facilities
          </div>

          <div className="p-5 border border-highlight rounded-lg">
            <div className="flex flex-wrap gap-2">
              {facilities.map((chip) => (
                <div
                  key={chip.id}
                  className={`hover:scale-105 text-xs transform transition duration-150 ease-linear px-2 py-1 rounded-md cursor-pointer ${
                    selectedChips.some(
                      (selectedChip) => selectedChip === chip.id
                    )
                      ? "bg-teal-900 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => handleChipClick(chip)}

                >
                  {chip.name}
                  &nbsp;
                  {selectedChips.some(
                    (selectedChip) => selectedChip === chip.id
                  ) ? (
                    <RemoveIcon className="text-black transform transition duration-150" />
                  ) : (
                    <AddIcon className="text-black transform transition duration-150" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Box>

        <div className="modal-action">
          <button
            className="btn btn-md bg-white/75 text-gray-900 hover:bg-gray-900 hover:text-white/75"
            onClick={() => {
              setStep(0);
            }}
          >
            Prev
          </button>

          <button
            className="btn btn-md bg-white/75 text-gray-900 hover:bg-gray-900 hover:text-white/75"
            onClick={() => {
              validateHandler();
            }}
          >
            Finish
          </button>
        </div>
      </div>
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

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" checked={modalStatus}  id="add-room-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle bg-opacity-70 ">
        <AddRoomSteps step={step} />
      </div>
    </>
  );
};

export default RoomModalForm;
