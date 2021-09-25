import React from "react";
import { Link } from "react-router-dom";

const PubItem = (props) => {
  const { id, title, description, publishername, image, dateFrom } = props;
  return (
    // <div className="bg-white w-full rounded-md shadow-md h-auto mx-8 py-3 px-3 my-5">
    <div className="bg-white rounded-md shadow-md h-auto mx-8 py-3 px-3 my-5">
      <div className="w-full h-16 flex items-center justify-between">
        <div className="flex">
          <div className="avatar">
            <div className="mb-8 rounded-full w-10 h-10">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@40w.png"
                alt=""
              />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-md font-semibold">{publishername}</h3>
            <p className="text-xs text-gray-500">{dateFrom}</p>
          </div>
        </div>
        <svg
          className="w-16"
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b0b0b0"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </div>
      <div className="flex flex-col space-y-4">
        {/* <Link to={"/post/" + id} className="badge py-4"> */}
        <Link to={"/post/" + id} className="badge h-auto p-4">
          <h3 className="text-md font-semibold">{title}</h3>
        </Link>
        <Link to={"/post/" + id} className="py-2">
          <p>{description}</p>
        </Link>
        <div className="flex justify-around pb-4">
          <img src={image} className="" alt="" />
        </div>
      </div>
      <hr />
      {/* <div className="grid grid-cols-3 w-full px-5 my-3"> */}
      <div className="flex pt-3">
        <button className="flex flex-row justify-center items-center w-full space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
            className="hover:fill-current text-green-200"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span className="font-semibold text-lg text-gray-600 hidden md:block">
            aimer
          </span>
        </button>
        <Link to={"/post/" + id} className="">
          {/* <button className="flex flex-row justify-center items-center w-full space-x-3"> */}
          <button className="flex flex-row justify-center items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
              className="hover:fill-current text-blue-400"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* <span className="font-semibold text-lg text-gray-600">
              <Link to={"/post/" + id} className="">
                répondre
              </Link>
            </span> */}
          </button>
        </Link>
        <span className="ml-4 font-semibold text-lg text-gray-600 hidden md:block">
          <Link to={"/post/" + id} className="">
            répondre
          </Link>
          {/* commentaires */}
        </span>

        <button className="flex flex-row justify-center items-center w-full space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span className="font-semibold text-lg text-gray-600 hidden md:block">
            partager
          </span>
        </button>
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default PubItem;
