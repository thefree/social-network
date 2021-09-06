import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {content}
              <Link
                to={"/publications"}
                className="mr-10 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
            </div>
            <Link
              to={"/publications"}
              className="mr-10 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
