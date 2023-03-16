import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import LoginSvg from "../../component/login/loginSvg";
import logo from "../../assests/oie_fCAaxhclGNkh.png";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../../component/login/LoginButton";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import User from "../../models/user";
import AuthenticationService from "../../services/authentication.service";
import AlertBox from "../../component/common/AlertBox";

const RegisterPage = () => {
  const [user, setUser] = useState(new User("", "", "", "", "", ""));
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.jwtToken) {
      navigate("/");
    }
    
  }, [navigate, currentUser]);

  let regName: RegExp = /^[a-zA-Z  ]*$/;
  let regMob: RegExp = /^([+]\d{2})?\d{10}$/;
  const formSchema = z
    .object({
      email: z
        .string()
        .email("Invalid email")
        .min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
      name: z
        .string()
        .regex(regName, "Please provide valid Name.")
        .min(1, "Name required")
        .min(3, "Name must have min 3 characters"),
      phone: z
        .string()
        .regex(regMob, "Please provide valid Phone Number (10 digits).")
        .min(10, "Phone number is not valid"),
      terms: z
        .literal(true, {
        errorMap: () => ({
          message: "You must accept the terms and conditions",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    user.email = data.email;
    user.name = data.name;
    user.phone = data.phone;
    user.password = data.password;

    console.log(user);

    AuthenticationService.register(user)
      .then((response) => {
        navigate("/login",{ state: {
          success: true,
          message: response.data
        }});
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 406) {          
          setErrorMessage(user.email+", is aleady taken.");
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
      });
  };

  return (
    <div className="lg:flex bg-white">
      <div className="hidden lg:flex items-center justify-center bg-white flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <LoginSvg />
        </div>
      </div>
      <div className="lg:w-1/2 xl:max-w-screen-md">
        <div className="pt-12 bg-gray-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="text-2xl text-teal-900 tracking-wide ml-2 font-semibold">
              Locus Haunt
            </div>
          </div>
        </div>
        <div className="px-12 pt-6 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
          {errorMessage && 
          <AlertBox success={false} message={errorMessage}  />
          }

          <h2
            className="pt-6 text-center text-4xl text-teal-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Sign Up
          </h2>

          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none bg-white " +
                    (errors.email
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="email"
                  placeholder="mike@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Full Name
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none bg-white " +
                    (errors.name
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="text"
                  placeholder="First Name"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.name?.message}
                  </span>
                )}
              </div>
             
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none bg-white " +
                    (errors.password
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Re-enter Password
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none bg-white " +
                    (errors.confirmPassword
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Phone Number
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none bg-white " +
                    (errors.phone
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="number"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.phone?.message}
                  </span>
                )}
              </div>
              <div className="mt-8 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-teal-300 bg-white "
                    {...register("terms")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-500"
                  >
                    I accept the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-teal-800 hover:underline dark:text-teal-800"
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
              <LoginButton Label="Sign Up" disbaled={isSubmitting} />
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center mb-5">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="cursor-pointer text-black hover:text-gray-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
