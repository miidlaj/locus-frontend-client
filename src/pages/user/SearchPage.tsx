import React from "react";
import SearchComponent from "../../component/user/Search/SearchComponent";

import "./SearchPage.css";

const SearchPage = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extralight text-white/50">Search</h3>
          <div className="inline-flex items-center space-x-2">
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

        <SearchComponent />

        <div className="text-center my-5">

          <div className="h-auto gap-10 grid place-items-center font-mono bg-dark-teal pt-10">


            <div className="rounded-md bg-gray-800 shadow-lg mx-10">
              <div className="md:flex px-4 leading-none max-w-auto">
                <div className="flex-none ">
                  <img
                    src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                    alt="pic"
                    className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 "
                  />
                </div>
                <div className="flex-col text-gray-300">
                  <p className="pt-4 text-2xl font-bold">Joker (2020)</p>
                  <hr className="hr-text" data-content="" />
                  <div className="text-md flex justify-between px-4 my-2">
                    <span className="font-bold">
                      2h 2min | Crime, Drama, Thriller
                    </span>
                    <span className="font-bold" />
                  </div>
                  <p className="hidden md:block px-4 my-4 text-sm text-left">
                    In Gotham City, mentally troubled comedian Arthur Fleck is
                    disregarded and mistreated by society. He then embarks on a
                    downward spiral of revolution and bloody crime. This path
                    brings him face-to-face with his alter-ego: the Joker.{" "}
                  </p>
                  <p className="flex text-md px-4 my-2">
                    Rating: 9.0/10
                    <span className="font-bold px-2">|</span>
                    Mood: Dark
                  </p>
                  <div className="text-xs">
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      TRAILER
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      IMDB
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      AMAZON
                    </button>
                  </div>
                  {/*             <p>ICON BTNS</p> */}
                </div>
              </div>
              <div className="flex justify-between items-center px-4 mb-4 w-full">
                <div className="flex">
                  <i className="material-icons mr-2 text-red-600">
                    favorite_border
                  </i>
                  <i className="material-icons text-blue-600">remove_red_eye</i>
                </div>
                <div className="flex">
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_satisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_neutral
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_dissatisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_outline
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_half
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">star</i>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-gray-800 shadow-lg mx-10">
              <div className="md:flex px-4 leading-none max-w-auto">
                <div className="flex-none ">
                  <img
                    src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                    alt="pic"
                    className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 "
                  />
                </div>
                <div className="flex-col text-gray-300">
                  <p className="pt-4 text-2xl font-bold">Joker (2020)</p>
                  <hr className="hr-text" data-content="" />
                  <div className="text-md flex justify-between px-4 my-2">
                    <span className="font-bold">
                      2h 2min | Crime, Drama, Thriller
                    </span>
                    <span className="font-bold" />
                  </div>
                  <p className="hidden md:block px-4 my-4 text-sm text-left">
                    In Gotham City, mentally troubled comedian Arthur Fleck is
                    disregarded and mistreated by society. He then embarks on a
                    downward spiral of revolution and bloody crime. This path
                    brings him face-to-face with his alter-ego: the Joker.{" "}
                  </p>
                  <p className="flex text-md px-4 my-2">
                    Rating: 9.0/10
                    <span className="font-bold px-2">|</span>
                    Mood: Dark
                  </p>
                  <div className="text-xs">
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      TRAILER
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      IMDB
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      AMAZON
                    </button>
                  </div>
                  {/*             <p>ICON BTNS</p> */}
                </div>
              </div>
              <div className="flex justify-between items-center px-4 mb-4 w-full">
                <div className="flex">
                  <i className="material-icons mr-2 text-red-600">
                    favorite_border
                  </i>
                  <i className="material-icons text-blue-600">remove_red_eye</i>
                </div>
                <div className="flex">
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_satisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_neutral
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_dissatisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_outline
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_half
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">star</i>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-gray-800 shadow-lg mx-10">
              <div className="md:flex px-4 leading-none max-w-auto">
                <div className="flex-none ">
                  <img
                    src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                    alt="pic"
                    className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 "
                  />
                </div>
                <div className="flex-col text-gray-300">
                  <p className="pt-4 text-2xl font-bold">Joker (2020)</p>
                  <hr className="hr-text" data-content="" />
                  <div className="text-md flex justify-between px-4 my-2">
                    <span className="font-bold">
                      2h 2min | Crime, Drama, Thriller
                    </span>
                    <span className="font-bold" />
                  </div>
                  <p className="hidden md:block px-4 my-4 text-sm text-left">
                    In Gotham City, mentally troubled comedian Arthur Fleck is
                    disregarded and mistreated by society. He then embarks on a
                    downward spiral of revolution and bloody crime. This path
                    brings him face-to-face with his alter-ego: the Joker.{" "}
                  </p>
                  <p className="flex text-md px-4 my-2">
                    Rating: 9.0/10
                    <span className="font-bold px-2">|</span>
                    Mood: Dark
                  </p>
                  <div className="text-xs">
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      TRAILER
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      IMDB
                    </button>
                    <button
                      type="button"
                      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      AMAZON
                    </button>
                  </div>
                  {/*             <p>ICON BTNS</p> */}
                </div>
              </div>
              <div className="flex justify-between items-center px-4 mb-4 w-full">
                <div className="flex">
                  <i className="material-icons mr-2 text-red-600">
                    favorite_border
                  </i>
                  <i className="material-icons text-blue-600">remove_red_eye</i>
                </div>
                <div className="flex">
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_satisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_neutral
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    sentiment_very_dissatisfied
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_outline
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">
                    star_half
                  </i>
                  <i className="material-icons ml-2 text-yellow-600">star</i>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
