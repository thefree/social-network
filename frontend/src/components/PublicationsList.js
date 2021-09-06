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
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Liste des Publications</h4>

        <ul className="list-group">
          {publications &&
            publications.map((publication, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePublication(publication, index)}
                key={index}
              >
                {publication.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPublications}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPublication ? (
          <div>
            <h4>Tutorial</h4>
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
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationsList;
