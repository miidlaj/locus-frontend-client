import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import AlertBox from "../../component/common/AlertBox";
const Resort = () => {
  const location = useLocation();

  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    if (location?.state?.success && location?.state?.resort) {
      setSuccessMessage(
        "Resort is under review. Resort will be visible public once if admin Approved."
      );
    }
  }, []);

  return (
    <>
      {successMessage && (
        <AlertBox
          message={successMessage}
          heading="Resort added Successfully!"
        />
      )}
      <div className="w-3/12">
        <Link to="/dashboard/resorts/new/0">
          <button
            id="btn"
            className="py-3 px-10 bg-gray-800 text-white rounded text shadow-xl"
          >
            Add Resort
          </button>
        </Link>
      </div>
    </>
  );
};

export default Resort;
