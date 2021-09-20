import React, { useState, useEffect } from "react";
import CommentDataService from "../services/CommentService";
import { Link } from "react-router-dom";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    retrieveComments();
  }, []);

  const onChangeSearchText = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const retrieveComments = () => {
    // CommentDataService.getAll()
    CommentDataService.getAllByUser()
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveComments();
    setCurrentComment(null);
    setCurrentIndex(-1);
  };

  const setActiveComment = (comment, index) => {
    setCurrentComment(comment);
    setCurrentIndex(index);
  };

  const desactiveComment = () => {
    setCurrentComment(false);
  };

  const removeAllComments = () => {
    CommentDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByText = () => {
    CommentDataService.findByText(searchText)
      .then((response) => {
        setComments(response.data);
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
              Gestion des commentaires
            </h1>
            <p className="mb-5 text-justify">
              Effectuez une recheche sur le contenu ou en selectionnant un
              commentaire dans la liste. <br />
              Attention: L'action sur le bouton " TOUT SUPPRIMER" est définitive
              !!!.
            </p>
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Filtrer les commentaires</span>
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by text"
            value={searchText}
            onChange={onChangeSearchText}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByText}
          >
            Search
          </button>
          <button className="btn btn-secondary" onClick={refreshList}>
            reset
          </button>
        </div>
        <hr className="my-5" />
      </div>
      <hr />

      <div className="">
        <h4 className="text-lg text-groupoblue">Liste des Commentaires</h4>

        <div className="artboard artboard-demo bg-base-200">
          <ul className="menu py-4 shadow-lg bg-base-100 rounded-box">
            {comments &&
              comments.map((comment, index) => (
                <li
                  className={
                    "hover-bordered " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveComment(comment, index)}
                  key={index}
                >
                  <a>{comment.text}</a>
                </li>
              ))}
          </ul>
        </div>

        <div className="my-5 border-2 border-red-600">
          <p className="text-2xl text-red-800">
            Supprimer toutes les commentaires.
            <br />
            Cette action est irréversible ...
          </p>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllComments}
          >
            Tout supprimer !!!
          </button>
        </div>
      </div>
      {currentComment ? (
        <div id="my-modal" className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-center items-center">
              <div>
                <h4>Commentaire</h4>
                <div>
                  <label>
                    <strong>Texte:</strong>
                  </label>{" "}
                  {currentComment.text}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentComment.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/comments/" + currentComment.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="modal-action">
              <a href="#" className="btn" onClick={desactiveComment}>
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

export default CommentsList;
