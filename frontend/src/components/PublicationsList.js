import React, { useState, useEffect } from "react";
import PublicationDataService from "../services/PublicationService";
import { useHistory, Link } from "react-router-dom";

import PubItemPostAdmin from "./PubItemPostAdmin";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [currentPublication, setCurrentPublication] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

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
            {/* <p className="mb-5 text-justify">
              Effectuez une recheche sur le titre ou en selectionnant une
              publication dans la liste. <br />
              Attention: L'action sur le bouton " TOUT SUPPRIMER" est définitive
              !!!.
            </p> */}
          </div>
        </div>
      </div>

      <div className=""></div>
      {/* ============================= */}
      <div>
        {publications &&
          publications.map((publication, index) => (
            <>
              <header className="bg-white shadow">
                <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  {/* <h1 className="text-2xl font-bold text-gray-900">
                    {publication.title}
                  </h1> */}
                </div>
              </header>
              <main>
                <PubItemPostAdmin
                  key={publication.id}
                  id={publication.id}
                  title={publication.title}
                  description={publication.description}
                  // publishername={publishername.username}
                  publishername={publication.name}
                  image={publication.imageUrl}
                  onClick={() => setActivePublication(publication, index)}
                  dateFrom={publication.createdAt}
                />
              </main>
            </>
          ))}
      </div>
      {/* ============================= */}
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
