import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import userService from "../services/user.service";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  let history = useHistory();

  useEffect(() => {
    UserService.getModeratorBoard().then(
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
    retrieveUsers();
    // eslint-disable-next-line
  }, []);

  const retrieveUsers = () => {
    UserService.getAllUser()
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);

    // history.push("#my-modal");
    // history.replace("#my-modal");
  };

  const desactiveUser = () => {
    setCurrentUser(false);
  };

  const deleteUser = () => {
    userService
      .removeUserById(currentUser.id)
      .then((response) => {
        // console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Gestion des UTILISATEURS
            </h1>
            {/* <p className="mb-5 text-justify">
              Effectuez une recheche sur le titre ou en selectionnant une
              publication dans la liste. <br />
              Attention: L'action sur le bouton " TOUT SUPPRIMER" est définitive
              !!!.
            </p> */}
          </div>
        </div>
      </div>

      {/* <div className=""></div> */}
      {/* ============================= */}
      <div className="">
        <h4 className="text-lg mb-5">Liste des Utilisateurs</h4>
        <div className="artboard artboard-demo bg-base-200">
          <ul className="menu w-auto py-4 shadow-lg bg-base-100 rounded-box">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "hover-bordered " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                  <a>{user.username}</a>
                </li>
              ))}
          </ul>
        </div>

        {/* <div className="flex flex-col my-5 border-2 border-red-600">
          <p className="flex justify-center text-1xl">
            Supprimer toutes les commentaires.
            <br />
            Cette action est irréversible ...
          </p>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={removeAllComments}
          >
            Tout supprimer !
          </button>
        </div> */}
      </div>
      {/* ============================= */}
      {currentUser ? (
        <div id="my-modal" className="modal modal-open">
          <div className="modal-box">
            <div className="flex flex-col">
              {/* <div> */}
              <h4 className="text-lg font-semibold mb-5">Utilisateur</h4>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Pseudo:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div className="flex">
                <a
                  href="#"
                  className="badge badge-warning text-lg"
                  onClick={deleteUser}
                >
                  Supprimer l'utilisateur
                </a>
              </div>
              {/* </div> */}
            </div>
            <div className="modal-action">
              <a href="#" className="btn" onClick={desactiveUser}>
                Fermer
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <br />
            <p>Please click on a Comment...</p> */}
        </div>
      )}
    </div>
  );
};

export default UsersList;
