import React from "react";

const PubItemPostCommentAdmin = (props) => {
  const { text, commenter_name, dateFrom, onClick } = props;
  return (
    <div className="bg-gray-100 rounded-md shadow-md h-auto py-3 px-3 mx-10 my-5">
      {/* <div className="bg-gray-100 w-full rounded-md shadow-md h-auto py-3 px-3 mx-10 my-5"> */}
      {/* <div className="bg-groupogris w-full rounded-md shadow-md h-auto py-3 px-3 mx-10 my-5"> */}
      <div className="w-full h-16 flex items-center justify-between ">
        <div className="flex">
          {/* <img
            className=" rounded-full w-10 h-10 mr-3"
            src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A"
            alt=""
          /> */}
          <div className="avatar">
            <div className="mb-8 rounded-full w-10 h-10">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@40w.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold">{commenter_name}</h3>
            <p className="text-xs text-gray-500">{dateFrom}</p>
          </div>
        </div>
        <svg
          className="w-16 hover:bg-pink-400 text-pink-600"
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b0b0b0"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
          onClick={onClick}
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </div>
      {/* <h3 className="text-md font-semibold ">{title}</h3> */}
      <p>{text}</p>
    </div>
  );
};

export default PubItemPostCommentAdmin;
