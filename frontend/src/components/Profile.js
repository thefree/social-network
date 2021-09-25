import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useHistory, Link } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const Profile = () => {
  // const currentUser = AuthService.getCurrentUser();
  // let currentUser = undefined;

  const [currentUser, setCurrentUser] = useState();

  let history = useHistory();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        // setContent(response.data);
      },
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          EventBus.dispatch("logout");
          history.push("/login");
        }
      }
    );
    // currentUser = AuthService.getCurrentUser();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    console.log("Current User: ", currentUser);
  }, []);

  return (
    <>
      {currentUser ? (
        <div className="hero min-h-screen bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                {currentUser.username} Profile
              </h1>
              <p className="mb-5">
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )}
              </p>
              <p className="mb-5">
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <br />
          <p>Please click on a Publication...</p> */}
        </div>
      )}
    </>
  );
};

export default Profile;
