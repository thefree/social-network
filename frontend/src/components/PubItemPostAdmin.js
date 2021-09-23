import React from "react";

const PubItemPostAdmin = (props) => {
  const { title, description, publishername, image } = props;
  return (
    <div className="bg-white rounded-md shadow-md h-auto mx-8 py-3 px-3 my-5">
      {/* <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5"> */}
      <div className="w-full h-16 flex items-center justify-between ">
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
            <p className="text-xs text-gray-500">45 mnt</p>
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
        <h3 className="text-md font-semibold ">{title}</h3>
        <p>{description}</p>
        <img src={image} className="max-w-md" alt="" />
      </div>
    </div>
  );
};

export default PubItemPostAdmin;
