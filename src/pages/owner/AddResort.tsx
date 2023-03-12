import { useParams } from "react-router-dom";
import image from "../../assests/ResortForm.png";
import ResortForm from "../../component/owner/AddResort/ResortForm";
import ResortImages from "../../component/owner/AddResort/image/ResortImages";
import MapSelection from "../../component/owner/AddResort/map/MapSelection";

const AddResort = () => {
  const params = useParams();

  const step = typeof params.step === "string" ? parseInt(params.step) : 0;

  switch (step) {
    case 0:
      return (
        <>
          <div className="flex-1 px-2 py-28 sm:px-0lg:flex duration-300 ">
            <div className="lg:w-1/2 xl:max-w-screen-md">
              <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                
                <div className="mt-12 text-white font-mono">
                  <ResortForm />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <div className="duration-300 w-full h-screen">
          <ResortImages />
        </div>
      );
    case 2:
      return (
        <div className="duration-300">
          <MapSelection />
        </div>
      );

    default:
      return null;
  }
};

export default AddResort;
