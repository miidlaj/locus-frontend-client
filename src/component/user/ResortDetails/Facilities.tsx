import React from "react";

import PoolIcon from "@mui/icons-material/Pool";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CancelIcon from "@mui/icons-material/Cancel";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PetsIcon from "@mui/icons-material/Pets";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SpaIcon from "@mui/icons-material/Spa";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessibleIcon from "@mui/icons-material/Accessible";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

interface FacCat {
  id: number;
  name: string;
  description: string;
}

interface ResortDetails {
  facilties: FacCat[];
}
const Facilities = (props: ResortDetails) => {
  const { facilties } = props;

  return (
    <>
      <div className="flex-col w-full h-auto items-center bg-dark-teal text-white rounded-md hover:scale-[1.01] duration-300 transition ease-in-out">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Facilities
          </h5>

          <div className="flex gap-10 gap-x-32 flex-wrap px-5 pt-5">
            {facilties.map((facility, index) => (
              <>
                {facility?.name.includes("Swimming Pool") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <PoolIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Swimming Pool
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Free Cancellation") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <CancelIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Free Cancellation
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Car Parking") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <LocalParkingIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Car Parking
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Restaurant") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <RestaurantIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Restaurant
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Family Freindly") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <FamilyRestroomIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Family Freindly
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Gym") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <FitnessCenterIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Gym
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Free Breakfast") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <FreeBreakfastIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Free Breakfast
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("WiFi") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <SignalWifiStatusbar4BarIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        WiFi
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Air Conditioning") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <AcUnitIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Air Conditioning
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Pet Friendly") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <PetsIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Pet Friendly
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Spa") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <SpaIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Spa
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}

                {facility?.name.includes("Wheelchair Accessible") ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={facility.description}
                  >
                    <span>
                      <AccessibleIcon />
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Wheelchair Accessible
                      </p>
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Facilities;
