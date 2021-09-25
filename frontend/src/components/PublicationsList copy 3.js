import React, { useState, useEffect } from "react";
import PublicationDataService from "../services/PublicationService";
import { Link } from "react-router-dom";
// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [currentPublication, setCurrentPublication] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePublications();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePublications = () => {
    // PublicationDataService.getAll()
    PublicationDataService.getAllByUser()
      .then((response) => {
        setPublications(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePublications();
    setCurrentPublication(null);
    setCurrentIndex(-1);
  };

  const setActivePublication = (publication, index) => {
    setCurrentPublication(publication);
    setCurrentIndex(index);
    // history.push("#my-modal");
    // history.replace("#my-modal");
  };

  const desactivePublication = () => {
    setCurrentPublication(false);
  };

  const removeAllPublications = () => {
    PublicationDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PublicationDataService.findByTitle(searchTitle)
      .then((response) => {
        setPublications(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Gestion des publications
            </h1>
            <p className="mb-5 text-justify">
              Effectuez une recheche sur le titre ou en selectionnant une
              publication dans la liste. <br />
              Attention: L'action sur le bouton " TOUT SUPPRIMER" est définitive
              !!!.
            </p>
          </div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Filtrer les Publication</span>
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Chercher par titre"
            className="input input-primary input-bordered"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={findByTitle}
          >
            go
          </button>
          <button className="btn bg-groupopink" onClick={refreshList}>
            reset
          </button>
        </div>
        <hr className="my-5" />
      </div>

      <hr />

      <div className="">
        <h4 className="text-lg text-groupoblue pb-5 font-semibold">
          Liste des Publications
        </h4>

        <div className="artboard artboard-demo bg-base-200">
          <ul className="menu py-4 shadow-lg bg-base-100 rounded-box">
            {publications &&
              publications.map((publication, index) => (
                <li
                  className={
                    "hover-bordered " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActivePublication(publication, index)}
                  key={index}
                >
                  <a>{publication.title}</a>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col my-5 border-2 border-red-600">
          <p className="flex justify-center text-1xl">
            Supprimer toutes les publications.
            <br />
            Cette action est irréversible ...
          </p>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={removeAllPublications}
          >
            Tout supprimer !!!
          </button>
        </div>
      </div>
      {currentPublication ? (
        <div id="my-modal" className="modal modal-open">
          <div className="modal-box">
            <div className="flex flex-col">
              {/* {currentPublication ? ( */}
              {/* <div> */}
              <h4 className="text-lg font-semibold mb-5">Publication</h4>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Titre:</strong>
                </label>{" "}
                {currentPublication.title}
              </div>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPublication.description}
              </div>
              <div className="flex flex-col pb-5">
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPublication.published ? "Published" : "Pending"}
              </div>
              <div className="flex">
                <Link
                  to={"/publications/" + currentPublication.id}
                  className="badge badge-warning text-lg"
                >
                  Editer
                </Link>
              </div>
              {/* </div> */}
            </div>
            <div className="modal-action">
              <a href="#" className="btn" onClick={desactivePublication}>
                Fermer
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <br />
          <p>Please click on a Publication...</p> */}
        </div>
      )}
    </div>
  );
};

export default PublicationsList;
