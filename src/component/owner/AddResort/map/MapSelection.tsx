import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import locationService from "../../../../services/resort/location.service";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWlkbGFqIiwiYSI6ImNsZW9qdTJzaTAwOW0zdm5xaDdhaXpxM2QifQ.zBp6eNOrjKgaO4l0SL419Q";
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapSelection = () => {
  type SuggestionType = {
    place_name: string;
    center: number[];
  };
  type SelectedPlaceType = {
    place_name: string;
    center: [number, number];
  };
  const [suggestions, setSuggestions] = React.useState<SuggestionType[]>([]);
  const [selectedPlace, setSelectedPlace] = React.useState<SelectedPlaceType>({
    center: [0, 0],
    place_name: "",
  });
  const [submitButton, setSubmitButton] = React.useState(false);

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


  let location = useLocation();
  const navigate = useNavigate();

  const resortId = location?.state?.resortId;

  console.log(resortId);
  
 
  const [InputPlace, setInputPlace] = React.useState("");

  React.useEffect(() => {
    if (!location?.state?.success || location?.state?.resortId === undefined ) {
      navigate("/dashboard/resorts/new/0");
    }
    setAlert({
      message: "Add Location Details. Add you Resort Location here. Point to maximum inner region. This will be used to filter by location Name",
      type: "info",
      show: true,
    });

    const bounds = new mapboxgl.LngLatBounds();
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/midlaj/cleoubi9v00b701qfl5q5felj",
      center: [76.6413, 10.1632],
      zoom: 7,
    });

    if (selectedPlace?.center !== undefined && selectedPlace?.center[0] > 0) {
      addToMap(map, selectedPlace.center);
      bounds.extend(selectedPlace.center);
      addBoundsToMap(map, bounds);
      setSubmitButton(true);
    }
  }, [location?.state?.success, navigate, selectedPlace]);

  const addToMap = (map: mapboxgl.Map, cordinates: [number, number]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const marker = new mapboxgl.Marker().setLngLat(cordinates).addTo(map);
    
  };

  const addBoundsToMap = (map: mapboxgl.Map, bounds: mapboxgl.LngLatBounds) => {
    map.fitBounds(bounds, { padding: 20, zoom: 10 });
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitButton(false);
    setInputPlace(e.target.value);
    const query = InputPlace;
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${MAPBOX_TOKEN}&country=IN&region=KL`;

    const response = await fetch(url);
    const data = await response.json();

    let arr: SuggestionType[] = [];
    // eslint-disable-next-line array-callback-return
    data.features.map((element: any, index: number) => {
      const { center, place_name } = element;
      const obj = {
        center: center,
        place_name: place_name,
      };
      arr.push(obj);
    });
    setSuggestions(arr);
  };

  function handleSuggestion(suggestion: SuggestionType) {
    setSelectedPlace({
      center: [suggestion.center[0], suggestion.center[1]],
      place_name: suggestion.place_name,
    });
    setInputPlace(suggestion.place_name);
    setSuggestions([]);
  }

  const navigateToResortPage = () => {
    navigate("/dashboard/resorts", {
      state: {
        success: true,
        resort: true,
      }});
  }
  const submitLocationDetails = () => {
    const locationObj = {
      resortId: resortId,
      longitude: selectedPlace.center[0],
      latitude: selectedPlace.center[1],
      location: selectedPlace.place_name      
    }
    locationService.setLocationForResort(locationObj)
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setAlert({
          message: "Submitted Successfully",
          type: "success",
          show: true,
        });
        
        setTimeout(navigateToResortPage, 3000);
      }
    })
    .catch((error) => {
      console.log(error);

      setAlert({
        message: error.response.data,
        type: "error",
        show: true,
      });
    });
  }
  return (
    <>
    
    {/* Alert */}
    {alert.show && (
          <Collapse in={alert.show} className="pr-10">
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

      <div className="relative w-[1350px] pt-5 pr-10">
        <div id="map" className="h-screen sm:w-full w-1/2 border-2 border-teal-900 " />

        <div className="absolute top-3 left-5 z-10 w-full pt-3">
          <div className="">
            <div className="w-40 inline-flex flex-col justify-center relative text-white">
              <div className="relative sm:flex">
                <div>
                  <input
                    className="sm:w-96 w-72 text-lg py-2 bg-transparent border-b border-white focus:outline-none placeholder:text-white"
                    type="search"
                    value={InputPlace}
                    onChange={handleSearchInput}
                    placeholder="Search Place"
                  />
                </div>

                <div className="pl-5">
                  {submitButton && (
                    <button
                      className="btn bg-teal-900 text-white px-5 py-3 w-auto tracking-wide rounded-sm
                          font-semibold font-display focus:outline-none focus:shadow-outline transform duration-300 hover:bg-gray-900 hover:text-white 
                          shadow-lg disabled:cursor-not-allowed cursor-pointer " onClick={submitLocationDetails}
                    >
                      Submit
                    </button>
                  )}
                </div>

              </div>
              {suggestions?.length > 0 && (
                <>
                  <h3 className="mt-2 text-sm">Result:</h3>

                  <ul className="bg-white border border-gray-100 w-96 mt-2 ">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestion(suggestion)}
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
                        {suggestion.place_name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapSelection;
