import React from "react";
import { useEffect, useState } from "react";
import "./LoginPage.css";
import LoginSvg from "../../component/login/loginSvg";
import logo from "../../assests/oie_fCAaxhclGNkh.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginButton from "../../component/login/LoginButton";
import User from "../../models/user";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import AuthenticationService from "../../services/authentication.service";
import { useDispatch } from "react-redux/es/exports";
import { setCurrentUser } from "../../store/actions/user";
import AlertBox from "../../component/common/AlertBox";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "../../common/Constants";

function LoginPage() {
  const [user, setUser] = useState(new User("", "", "", "", "", ""));
  const [errorMessage, setErrorMessage] = useState("");
  const [successRegister, setSuccessRegister] = useState("");

  const { state } = useLocation();

  const currentUser = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  
  useEffect(() => {
    if (state?.success) {
      setSuccessRegister(state?.message);
    } else if (state?.success === false) {
      setErrorMessage(state?.message);
    }

    if (currentUser?.jwtToken) {
      navigate("/");
    }
  }, []);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setSuccessRegister("");
    user.email = data.email;
    user.password = data.password;

    AuthenticationService.login(user)
      .then((response) => {
        //set user in session.
        dispatch(setCurrentUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 423) {
          setErrorMessage("Bad Credintials");
        } else if (error?.response?.status === 406){
          setErrorMessage("Your Account is disabled!");
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
      });
  };

  return (
    <div className="lg:flex">
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
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          {successRegister && (
            <AlertBox message={successRegister} heading="Registered!" />
          )}
          {errorMessage && <AlertBox message={errorMessage} heading="Oops!" />}
          <h2
            className="pt-6 text-center text-4xl text-teal-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none " +
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
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-display font-semibold text-teal-900 hover:text-gray-500 cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none " +
                    (errors.password
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="mt-10">
                <LoginButton Label="Sign In" disbaled={isSubmitting} />
              </div>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="flex items-center justify-center space-x-4 mt-3">
              <a href={GITHUB_AUTH_URL} className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-teal-900 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <svg
                className="w-6 h-6 mr-3"
                  enableBackground="new 0 0 512 512"
                  height="512px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="512px"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path
                      clipRule="evenodd"
                      d="M296.133,354.174c49.885-5.891,102.942-24.029,102.942-110.192   c0-24.49-8.624-44.448-22.67-59.869c2.266-5.89,9.515-28.114-2.734-58.947c0,0-18.139-5.898-60.759,22.669   c-18.139-4.983-38.09-8.163-56.682-8.163c-19.053,0-39.011,3.18-56.697,8.163c-43.082-28.567-61.22-22.669-61.22-22.669   c-12.241,30.833-4.983,53.057-2.718,58.947c-14.061,15.42-22.677,35.379-22.677,59.869c0,86.163,53.057,104.301,102.942,110.192   c-6.344,5.452-12.241,15.873-14.507,30.387c-12.702,5.438-45.808,15.873-65.758-18.592c0,0-11.795-21.31-34.012-22.669   c0,0-22.224-0.453-1.813,13.592c0,0,14.96,6.812,24.943,32.653c0,0,13.6,43.089,76.179,29.48v38.543   c0,5.906-4.53,12.702-15.865,10.89C96.139,438.977,32.2,354.626,32.2,255.77c0-123.807,100.216-224.022,224.03-224.022   c123.347,0,224.023,100.216,223.57,224.022c0,98.856-63.946,182.754-152.828,212.688c-11.342,2.266-15.873-4.53-15.873-10.89   V395.45C311.1,374.577,304.288,360.985,296.133,354.174L296.133,354.174z M512,256.23C512,114.73,397.263,0,256.23,0   C114.73,0,0,114.73,0,256.23C0,397.263,114.73,512,256.23,512C397.263,512,512,397.263,512,256.23L512,256.23z"
                      fill="#0D2636"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
                Github
              </a>
              <a href={GOOGLE_AUTH_URL} className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-teal-900 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <img
                  src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                  className="w-6 h-6 mr-3"
                  alt="google logo"
                />
                Google
              </a>

              <a href={FACEBOOK_AUTH_URL} className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-teal-900 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                  className="w-6 h-6 mr-3"
                  alt="Facebook logo"
                />
                Facebook
              </a>
            </div>

            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?{" "}
              <Link
                to="/register"
                className="cursor-pointer text-black hover:text-gray-600"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-white flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <LoginSvg />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
