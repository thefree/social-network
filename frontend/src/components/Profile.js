import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            {currentUser.username} Profile
          </h1>
          <p className="mb-5">
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
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

    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>
    //       <strong>{currentUser.username}</strong> Profile
    //     </h3>
    //   </header>
    //   <p>
    //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
    //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
    //   </p>
    //   <p>
    //     <strong>Id:</strong> {currentUser.id}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {currentUser.email}
    //   </p>
    //   <strong>Authorities:</strong>
    //   <ul>
    //     {currentUser.roles &&
    //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    //   </ul>
    // </div>
  );
};

export default Profile;
