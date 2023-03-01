import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Category from "./Category";
import FormHelperText from "@mui/material/FormHelperText";

type Props = {
  categoryId: number;
  description: string;
  descriptionHandler: (value: string) => void;
  categoryHandler: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const Description = (props: Props) => {
  const {
    categoryId,
    description,
    categoryHandler,
    descriptionHandler,
    nextStep,
    prevStep,
  } = props;

  const [descriptionValidation, setDescriptionValidation] = React.useState("");
  const [categoryValidation, setCategoryValidation] = React.useState("");

  const [text, setText] = React.useState("");

  const handleChangee = (value: string) => {
    setText(value);
    descriptionHandler(value);
  };

  const remainingChars = 1024 - text.length;

  const onSubmit = () => {
    if (categoryId <= 0) {
      setCategoryValidation("Category is required");
    } else if (description.length > 1024) {
      setDescriptionValidation(
        "Description cannot have more than 1024 charatcers."
      );
    } else if (description.length < 15) {
      setDescriptionValidation("Description must have minimum 15 characters");
    } else {
      setCategoryValidation("");
      setDescriptionValidation("");
      nextStep();
    }
  };

  return (
    <>
      <div className="sm:pt-10">
        <div className="">
          <div className="text-sm font-bold text-gray-700 tracking-wide">
            Category
          </div>
          <Category
            categoryValidation={categoryValidation}
            categoryId={categoryId}
            categoryHandler={categoryHandler}
          />
        </div>

        <div className="mt-8">
          <div className="text-sm font-bold text-gray-700 tracking-wide">
            Description
            <FormHelperText className="float-right">
              {remainingChars} / 1024
            </FormHelperText>
          </div>
        </div>
        <ReactQuill
          value={description}
          onChange={handleChangee}
          className="h-40"
        />
      </div>

      <div className="pt-10">
        {descriptionValidation && (
          <span className="text-red-700 text-sm block mt-2">
            {descriptionValidation}
          </span>
        )}
      </div>

      <div className="flex pt-20">
        <button
          onClick={prevStep}
          className="border border-teal-900 text-teal-900 block rounded-sm font-bold py-2 px-4 mr-2 flex items-center hover:bg-teal-900 hover:text-white transform transition duration-150 ease-linear"
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
          className="border border-teal-900 bg-teal-900 text-white hover:text-teal-900 hover:bg-white block rounded-sm font-bold py-2 px-4 ml-2 flex items-center transform transition duration-150 ease-linear"
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
    </>
  );
};

export default Description;
