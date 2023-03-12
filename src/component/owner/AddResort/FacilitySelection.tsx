import * as React from "react";
import facilityService from "../../../services/resort/facility.service";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


type Props = {
  facilityIds: number[];
  nextStep: () => void;
  prevStep: () => void;
  facilityHandler: (val: number[]) => void;
};

const FacilitySelection = (props: Props) => {
  interface Facility {
    id: number;
    name: string;
    description: string;
  }

  const { facilityIds, nextStep, prevStep, facilityHandler } = props;

  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");


  const [selectedChips, setSelectedChips] = React.useState(facilityIds);

  const handleChipClick = (facility: Facility) => {
    if (selectedChips.some((selectedChip) => selectedChip === facility.id)) {
      setSelectedChips((prevSelectedChips) =>
        prevSelectedChips.filter((selectedChip) => selectedChip !== facility.id)
      );
    } else {
      setSelectedChips((prevSelectedChips) => [...prevSelectedChips, facility.id]);
    }    
  };

  const onPrev = () => {
    console.log(selectedChips);
    facilityHandler(selectedChips);
    prevStep();
  }

  const onSubmit = () => {
    facilityHandler(selectedChips);
    if (selectedChips.length === 0) {
      setErrorMessage("Select atleast one facility!")
    } else {
      nextStep();
    }
  };


  React.useEffect(() => {
    facilityService
      .getAllFacilities()
      .then((response) => {
        setFacilities(response.data);
        
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Unexpected error occurred.");
      });
  }, []);

  return (
    <div className="sm:pt-24 duration-300">
      <div className="text-sm font-semibold text-white tracking-wide">
        Facilities
      </div>

      <div className="p-5 border border-highlight rounded-lg">
      <div className="flex flex-wrap gap-2">
        {facilities.map((chip) => (
          <div
            key={chip.id}
            className={`hover:scale-105 transform transition duration-150 ease-linear px-2 py-1 rounded-md cursor-pointer ${
              selectedChips.some((selectedChip) => selectedChip === chip.id)
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-900'
            }`}
            onClick={() => handleChipClick(chip)}
          >
            {chip.name}
            &nbsp; 
            {

                selectedChips.some((selectedChip) => selectedChip === chip.id)
                  ? <RemoveIcon className="text-black transform transition duration-150" />
                  : <AddIcon className="text-black transform transition duration-150" />
            }
          </div>
        ))}
      </div>
    </div>
    { errorMessage &&
        <p className='text-red-700 text-sm block mt-2'>{errorMessage}</p>
      }

   

      <div className="flex pt-20">
        <button
          onClick={onPrev}
          className="border border-gray-900 text-gray-900 block rounded-sm font-bold py-2 px-4 mr-2 flex items-center hover:bg-gray-900 hover:text-white transform transition duration-150 ease-linear"
        >
          <svg
            className="h-5 w-5 mr-2 fill-current"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            xmlSpace="preserve"
          >
            <path
              id="XMLID_10_"
              d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={onSubmit}
          className="border border-gray-900 bg-gray-900 text-white hover:text-gray-900 hover:bg-white block rounded-sm font-bold py-2 px-4 ml-2 flex items-center transform transition duration-150 ease-linear"
        >
          Next
          <svg
            className="h-5 w-5 ml-2 fill-current"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            xmlSpace="preserve"
          >
            <path
              id="XMLID_11_"
              d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
      l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
      c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilitySelection;
