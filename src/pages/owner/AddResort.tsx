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
          <div className="lg:flex duration-300">
            <div className="lg:w-1/2 xl:max-w-screen-md">
              <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2
                  className="pt-6 text-center text-4xl text-teal-900 font-display font-semibold lg:text-left xl:text-5xl
                  xl:text-bold"
                >
                  New Resort
                </h2>
                <div className="mt-12">
                  <ResortForm />
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center bg-white flex-1 h-screen">
              <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                <img src={image} alt="Resort Form " />
              </div>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <div className="pb-20 duration-300">
          <ResortImages />
        </div>
      );
    case 2:
      return (
        <div className="pb-20 duration-300">
          <MapSelection />
        </div>
      );

    default:
      return null;
  }
};

export default AddResort;
