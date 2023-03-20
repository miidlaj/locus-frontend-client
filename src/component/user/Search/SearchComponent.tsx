import React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import Grow from "@mui/material/Grow";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import resortSearchService from "../../../services/search/resortSearch.service";
import useCacheStore from "../../../zustand/useCacheStore";
import catergoryService from "../../../services/resort/catergory.service";
import facilityService from "../../../services/resort/facility.service";

import Slide from "@mui/material/Slide";
import { log } from "console";


const SearchComponent = () => {
  //   function formatDate(date: Date): string {
  //     const dd = String(date.getDate()).padStart(2, "0");
  //     const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  //     const yyyy = date.getFullYear();

  //     return `${yyyy}-${mm}-${dd}`;
  //   }

  //   const currentDate = formatDate(new Date());

  //   const tomorrow = new Date();
  //   tomorrow.setDate(tomorrow.getDate() + 1);
  //   const tomorrowDate = formatDate(tomorrow);

  const [placesuggestions, setPlacesuggestions] = React.useState<string[]>([]);

  const { categories, facilities, setCategories, setFacilities } = useCacheStore();

  const [selectedPlace, setSelectedPlace] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<typeof categories>([]);
  const [selectedFacilities, setSelectedFacilities] = React.useState<typeof facilities>([]);
  const [searchResult, setSearchResult] = React.useState([]);

  React.useEffect(() => {
    if (categories.length === 0) {
      console.log("Sending request...");

      catergoryService
        .getAllCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (facilities.length === 0) {
      facilityService
        .getAllFacilities()
        .then((response) => {
          setFacilities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLocationSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const query = e.target.value;
    setSelectedPlace(query);
    if (query.length !== 0) {
      resortSearchService
        .getLocationSuggestion(query)
        .then((resposne) => {
          setPlacesuggestions(resposne.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPlacesuggestions([]);
    }
  };

  const validateAndSearch = () => {
    if (selectedPlace.length !== 0) {
        const selectedCategoryIds = selectedCategories.map(c => c.id);
        const selectedFacilityIds = selectedFacilities.map(f => f.id);
        const obj = {
            place: selectedPlace,
            categories: selectedCategoryIds,
            facilities: selectedFacilityIds,
        }
        resortSearchService.getResortWithFilter(obj)
        .then((response) => {
            setSearchResult(response.data);
        }).catch((error) => {
            
        });
        console.log(obj);
    }
  }

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: typeof categories) => {
    setSelectedCategories(newValue);
  };

  const handleFacilityChange = (event: React.SyntheticEvent, newValue: typeof facilities) => {
    setSelectedFacilities(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <div className="">
        {/* <div className="flex items-center justify-center flex-wrap mx-auto sm:w-[100%] ">
          <div className="">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                disablePast
                closeOnSelect
                onChange={(e) => {
                  console.log(e);
                }}
                defaultValue={[dayjs(currentDate), dayjs(tomorrowDate)]}
              />
            </LocalizationProvider>
          </div>

          <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />

          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn m-1">
              <span className="flex items-center">
                <span className="inline-flex leading-none transform mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="pointer-events-none max-h-full max-w-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="currentColor">
                      <path d="M13.13 12.14a4.5 4.5 0 10-7.26 0A5 5 0 002 17a3 3 0 003 3h9a3 3 0 003-3 5 5 0 00-3.87-4.86zM9.5 6a3.49 3.49 0 012.44 6A3.5 3.5 0 016 9.5 3.5 3.5 0 019.5 6zM14 19H5a2 2 0 01-2-2 4 4 0 013.74-4 4.41 4.41 0 005.52 0A4 4 0 0116 17a2 2 0 01-2 2z"></path>
                      <path d="M19.31 10.24A3.93 3.93 0 0020 8a4 4 0 00-6.94-2.69 5.87 5.87 0 01.7.71A3 3 0 1116 11a2.91 2.91 0 01-1.15-.23v.11a4.5 4.5 0 01-.28.83A4 4 0 0016 12a3.94 3.94 0 002.55-.94A3 3 0 0121 14a1 1 0 01-1 1h-2.35a6.67 6.67 0 01.26 1H20a2 2 0 002-2 4 4 0 00-2.69-3.76z"></path>
                    </g>
                  </svg>
                </span>
                <span className="flex flex-col text-s text-grey-900">
                  <span data-testid="undefined-label" className="truncate">
                    1 Room
                  </span>
                  <span
                    data-testid="undefined-subline"
                    className="font-bold truncate"
                  >
                    3 Guests
                  </span>
                </span>
              </span>
            </label>
            <div
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            ></div>
          </div>

          <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />

        </div> */}

        <div className="flex items-center justify-center flex-wrap sm:w-[80%] mx-auto ">
          <Accordion
            onChange={() => setExpanded(!expanded)}
            sx={{
              width: "100%",
              background: "transparent",
              borderBottom: "3px solid rgb(1 68 81 / 1)",
              borderRadius: "10px",
            }}
            className="border-l-dark-teal shadow rounded-lg"
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <div className="relative">
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    border: "1px solid rgb(1 68 81 / 1)",
                    borderBottom: "3px solid rgb(1 68 81 / 1)",
                    borderRadius: "10px",
                  }}
                >
                  <InputBase
                  value={selectedPlace}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Location"
                    inputProps={{ "aria-label": "search maps" }}
                    onChange={(e) => {
                      handleLocationSearch(e);
                    }}
                  />
                  <Button
                    sx={{ p: "10px", background: "rgb(1 68 81 / 1)" }}
                    variant="contained"
                    endIcon={<SearchIcon className="text-light-emarald" />}
                    disabled={selectedPlace.length === 0}
                    onClick={validateAndSearch}
                  >
                    Search
                  </Button>
                </Paper>

                {placesuggestions?.length > 0 && (
                  <div className="absolute top-10 z-50 w-full">
                    <ul className="bg-white border border-gray-100 w-full mt-2 text-left">
                      {placesuggestions.map((suggestion, index) => (
                        <li
                        onClick={() => {
                            setSelectedPlace(suggestion)
                            setPlacesuggestions([]);
                        }}
                          key={index}
                          // onClick={() => handleSuggestion(suggestion)}
                          className="pl-8 pr-2 py-1 border-b-2 text-gray-900 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-700"
                        >
                          <svg
                            className="stroke-current absolute w-4 h-4 left-2 top-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionSummary>
            <Slide direction="up" in={expanded} mountOnEnter unmountOnExit>
              <AccordionDetails
                className="flex items-center justify-center flex-wrap"
                
              >
                <div className="w-1/2 px-4 py-1 ">
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Autocomplete
                        multiple
                        limitTags={1}
                        id="multiple-limit-tags"
                        options={categories}
                        onChange={handleCategoryChange}
                        sx={{
                          width: "100%",
                        }}
                        getOptionLabel={(option) => option.name}
                        
                        renderInput={(params) => (
                          <TextField
                            color="primary"
                            {...params}
                            label="Category"
                            placeholder=""
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </div>

                <div className="w-1/2 px-4 py-1 ">
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Autocomplete
                        multiple
                        limitTags={1}
                        id="multiple-limit-tags"
                        options={facilities}
                        sx={{
                          width: "100%",
                        }}
                        getOptionLabel={(option) => option.name}
                        onChange={handleFacilityChange}
                        renderInput={(params) => (
                          <TextField
                            color="primary"
                            {...params}
                            label="Facility"
                            placeholder=""
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </div>
              </AccordionDetails>
            </Slide>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
