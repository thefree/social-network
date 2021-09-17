import React, { useState, useEffect } from "react";
import PublicationDataService from "../services/PublicationService";
import { Link } from "react-router-dom";

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [currentPublication, setCurrentPublication] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePublications();
  }, []);

  // const history = useHistory();

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePublications = () => {
    PublicationDataService.getAll()
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
    // <div className="list row">
    // <div className="">
    // <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
          <button className="btn btn-secondary" onClick={refreshList}>
            reset
          </button>
        </div>
        <hr className="my-5" />
      </div>

      <hr />

      <div className="">
        <h4 className="text-lg text-groupoblue">Liste des Publications</h4>

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

        <div className="my-5 border-2 border-red-600">
          <p className="text-2xl text-red-800">
            Supprimer toutes les publications.
            <br />
            Cette action est irréversible ...
          </p>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllPublications}
          >
            Tout supprimer !!!
          </button>
        </div>
      </div>
      {currentPublication ? (
        <div id="my-modal" className="modal modal-open">
          <div className="modal-box">
            <div className="col-md-6">
              {/* {currentPublication ? ( */}
              <div>
                <h4>Publication</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentPublication.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentPublication.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentPublication.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/publications/" + currentPublication.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
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
