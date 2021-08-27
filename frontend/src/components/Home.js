import React, { useState, useEffect } from "react";

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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div className="bg-blue-400 h-screen grid">
        <div className="w-3/4 my-auto ml-20">
          <h1 className="text-5xl font-bold mb-10 text-white">
            JIT mode is cool
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            officia earum ducimus neque obcaecati consequuntur ratione accusamus
            at officiis tempore, magnam non debitis fugit unde alias id quidem
            necessitatibus. Fritzou
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
