import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

type Props = {
  zipCode: string;
  city: string;
  state: string;
  country: string;
  submitForm: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
};
const Address = (props: Props) => {
  const { city, country, state, zipCode, submitForm , handleChange, prevStep} = props;

  let regex: RegExp = /^[a-zA-Z]+$/;
  let regZip: RegExp = /^([+]\d{2})?\d{6}$/;
  const addressSchema = z.object({
    city: z
      .string()
      .regex(regex, "Please provide valid city.")
      .min(1, "City is required")
      .min(3, "City must have min 3 characters"),
    state: z
      .string()
      .min(1, "State is required")
      .min(3, "State must have min 3 characters")
      .regex(regex, "Please provide valid state."),
    country: z
      .string()
      .min(1, "Country is required")
      .min(3, "Country must have min 3 characters")
      .regex(regex, "Please provide valid Country."),
    zipCode: z
      .string()
      .min(1, "Zip code is required")
      .regex(regZip, "Please provide valid zip code (6 digits)."),
    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
  });

  type FormSchemaType = z.infer<typeof addressSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {    
    submitForm();
  }

  const handlePrev = () => {

  }

  return (
    <>
      <div className="">
        <div className="text-sm font-semibold text-white tracking-wide">
          Zip Code
        </div>
        <input
          className={
            "w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none " +
            (errors.zipCode ? "focus:border-red-700" : "focus:border-highlight")
          }
          type="text"
          value={zipCode}
          placeholder="******"
          {...register("zipCode")}
          onChange={handleChange}
          
        />
        {errors.zipCode && (
          <span className="text-red-700 text-sm block mt-2">
            {errors.zipCode?.message}
          </span>
        )}
      </div>
      <div className="mt-8">
        <div className="text-sm font-semibold text-white tracking-wide">
          City
        </div>
        <input
          className={
            "w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none " +
            (errors.city ? "focus:border-red-700" : "focus:border-highlight")
          }
          type="text"
          value={city}
          placeholder="City"
          {...register("city")}
          onChange={handleChange}

        />
        {errors.city && (
          <span className="text-red-700 text-sm block mt-2">
            {errors?.city?.message}
          </span>
        )}
      </div>

      <div className="mt-8">
        <div className="text-sm font-semibold text-white tracking-wide ">
          State
        </div>
        <input
          className={
            "w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none " +
            (errors.state ? "focus:border-red-700" : "focus:border-highlight")
          }
          type="text"
          value={state}
          placeholder="State"
          {...register("state")}
          onChange={handleChange}

        />
        {errors.state && (
          <span className="text-red-700 text-sm block mt-2">
            {errors.state?.message}
          </span>
        )}
      </div>
      <div className="mt-8">
        <div className="text-sm font-semibold text-white tracking-wide">
          Country
        </div>
        <input
          className={
            "w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none " +
            (errors.country ? "focus:border-red-700" : "focus:border-highlight")
          }
          type="text"
          placeholder="Country"
          value={country}
          {...register("country")}
          onChange={handleChange}
        />
        {errors.country && (
          <span className="text-red-700 text-sm block mt-2">
            {errors.country?.message}
          </span>
        )}
      </div>

      <div className="mt-8 flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-900 dark:ring-offset-gray-800"
            {...register("terms")}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className="font-light text-white "
          >
            I accept the{" "}
            <Link
              to="/terms"
              className="font-medium text-highlight hover:underline"
            >
              Terms and Conditions
            </Link>
          </label>
          {errors.terms && (
            <span className="text-red-700 text-sm block mt-2">
              {errors.terms?.message}
            </span>
          )}
        </div>
      </div>

      <div className="mt-10">
      <div className="flex pt-20">
        <button onClick={prevStep} className="border border-gray-900 text-gray-900 block rounded-sm font-bold py-2 px-4 mr-2 flex items-center hover:bg-gray-900 hover:text-white transform transition duration-150 ease-linear">
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
        <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="border border-gray-900 bg-gray-900 text-white hover:text-gray-900 hover:bg-white block rounded-sm font-bold py-2 px-4 ml-2 flex items-center transform transition duration-150 ease-linear">
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
    </>
  );
};

export default Address;
