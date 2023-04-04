/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Facilities from "../../component/user/ResortDetails/Facilities";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import resortSearchService from "../../services/search/resortSearch.service";
import RoomDetails from "../../component/user/ResortDetails/RoomDetails";
import useCacheStore from "../../zustand/useCacheStore";

// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

interface ResortAddress {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}
interface LocationDetails {
  id: number;
  location: string;
  longitude: number;
  lattitude: number;
}
interface ImageType {
  id: number;
  originalImageLink: string;
  resizedImageLink: string;
}

interface SearchResult {
  id: number;
  name: string;
  description: string;
  defaultImageLink: string;
  category: string;
  facilities: string[];
  resortAddress: ResortAddress;
  locationDetails: LocationDetails;
}

interface FacCat {
  id: number;
  name: string;
  description: string;
}
interface ImageType {
  id: number;
  originalImageLink: string;
  resizedImageLink: string;
}
interface ResortDetails {
  facilities: FacCat[];
  category: FacCat;
  images: ImageType[];
}

interface Resort {
  resort: SearchResult;
}
const ResortDetailsPage = () => {
  const navigate = useNavigate();

  const {resortDetails} = useCacheStore();  
  const [resortRemaining, setResortRemaining] = React.useState<ResortDetails>()

  let cordinates: [number, number] = [0,0]
  cordinates[0] = resortDetails.locationDetails.longitude;
  cordinates[1] = resortDetails.locationDetails.lattitude;

  const [selectedPlace] = React.useState<[number, number]>(cordinates);


  React.useEffect(() => {
    if (resortDetails.id === 0) {
      navigate("/search");
    }
  }, []);

  React.useEffect(() => {

   
      resortSearchService
      .getResortDetailsForUser(resortDetails?.id)
      .then((response) => {
        setResortRemaining(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/search");
      });
  
    
  }, []);

  React.useEffect(() => {
    const bounds = new mapboxgl.LngLatBounds();

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/midlaj/cleoubi9v00b701qfl5q5felj",
      center: [76.6413, 10.1632],
      zoom: 7,
      minZoom: 7,
    });

    if (selectedPlace !== undefined && selectedPlace[0] > 0) {
      addToMap(map, selectedPlace);
      bounds.extend(selectedPlace);
      addBoundsToMap(map, bounds);
    }
  }, [selectedPlace]);

  const addToMap = (map: mapboxgl.Map, cordinates: [number, number]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const marker = new mapboxgl.Marker().setLngLat(cordinates).addTo(map);
  };

  const addBoundsToMap = (map: mapboxgl.Map, bounds: mapboxgl.LngLatBounds) => {
    map.fitBounds(bounds, { padding: 20, zoom: 10 });
  };

  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Button
              variant="text"
              onClick={() => {
                navigate("/search");
              }}
              startIcon={<ArrowBackIosIcon />}
            >
              BACK
            </Button>
            <h3 className="ml-5 text-3xl font-extralight ">Resort Details</h3>
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

        <div className="h-screen mt-10">
          <div className="sm:flex justify-between font-thin shadow-lg rounded-lg p-4">
            <div className="gap-y-5">
              <h1 className="text-3xl font-bold">{resortDetails.name}</h1>

              <a
                href={`https://maps.google.com/?q=${resortDetails?.locationDetails.lattitude},${resortDetails.locationDetails?.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                <p className="">
                  <LocationOnIcon />
                  &nbsp;&nbsp;{resortDetails.locationDetails.location}
                </p>
              </a>

              <p className="">
                <LocalOfferIcon />
                &nbsp;&nbsp;Price Starts from 1600 onwards.
              </p>
            </div>
            <button className="btn bg-dark-emarald text-white hover:scale-105 duration-150 transition ease-in-out">
              Reserve Now
            </button>
          </div>
          <div className="h-1/2 sm:flex justify-center items-start w-full">
            <div className=" h-full sm:w-1/2 mt-10">
              <div className="carousel carousel-center max-w-xl p-4 space-x-4 bg-neutral rounded-box  h-full hover:scale-[1.01] duration-300 transition ease-in-out">
                <div className="carousel-item">
                  <img
                    src={resortDetails.defaultImageLink}
                    className="rounded-box w-auto"
                    alt="default"
                  />
                </div>

                {resortRemaining?.images.map((image, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={image.originalImageLink}
                      alt={index.toString()}
                      className="rounded-box w-auto"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-600">Hover and swipe*</p>
            </div>
            <div
              className=" h-full sm:w-1/2 mt-10 rounded-box hover:scale-[1.01] duration-300 transition ease-in-out"
              id="map"
            ></div>
          </div>
          <div className="w-full mt-20">
            <Facilities
              facilties={
                resortRemaining?.facilities !== undefined
                  ? resortRemaining?.facilities
                  : []
              }
            />
          </div>
        </div>

        <div className="w-full sm:flex">
          
          <div
            className="w-2/3 h-auto"
            dangerouslySetInnerHTML={{ __html: resortDetails.description }}
          ></div>

          <div className="w-1/3">
 
          <div className="grid place-items-center antialiased text-gray-900">
  <div>
    <img
      src={resortDetails.defaultImageLink}
      alt=" default imgee"
      className="w-full object-cover object-center rounded-lg shadow-md"
    />
    <div className="relative px-4 -mt-16  ">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-baseline">
          <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
            New
          </span>
          <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
            • 3 rooms
          </div>
        </div>
        <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
          {resortDetails.name}
        </h4>
        <div className="mt-1">
          800
          <span className="text-gray-600 text-sm"> /night</span>
        </div>
        <div className="mt-4">
          <span className="text-teal-600 text-md font-semibold">
            4/5 ratings{" "}
          </span>
          <span className="text-sm text-gray-600">(based on 234 ratings)</span>
        </div>
      </div>
    </div>
  </div>
</div>


          </div>
        </div>
        <div className="w-full mt-10">
          <RoomDetails resortId={resortDetails.id} />
        </div>
      </div>
    </>
  );
};

export default ResortDetailsPage;
