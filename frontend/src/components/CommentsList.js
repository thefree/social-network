import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import CommentDataService from "../services/CommentService";

import PubItemPostAdminCom from "./PubItemPostAdminCom";
import PubItemPostCommentAdmin from "./PubItemPostCommentAdmin";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");

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
      {/* Search Form */}

      {/* <div className="form-control">
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
            className="btn btn-primary"
            type="button"
            onClick={findByText}
          >
            Search
          </button>
          <button className="btn bg-groupopink" onClick={refreshList}>
            reset
          </button>
        </div>
        <hr className="my-5" />
      </div> */}

      {/* Fin search Form */}
      <hr />
      <div className="">
        <h4 className="text-lg mb-5">Liste des Commentaires</h4>
        {/* <div className="artboard artboard-demo bg-base-200">
          <ul className="menu w-auto py-4 shadow-lg bg-base-100 rounded-box">
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
        </div> */}

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
      <div>
        {comments &&
          comments.map((comment, index) => (
            <>
              <header className="bg-white shadow">
                <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {comment.publication.title}
                  </h1>
                </div>
              </header>
              <main>
                <PubItemPostAdminCom
                  key={comment.publication.id}
                  id={comment.publication.id}
                  title={comment.publication.title}
                  description={comment.publication.description}
                  // publishername={publishername.username}
                  publishername={comment.publication.name}
                  image={comment.publication.imageUrl}
                  // dateFrom={comment.publication.createdAt}
                  dateFrom={comment.publication.createdAt.substring(0, 25)}
                />
              </main>
              <aside className="">
                <h2 className="mx-10 text-xl font-bold text-gray-900">
                  Commentaire
                </h2>
                {/* {comments?.map((comment, index) => ( */}
                <PubItemPostCommentAdmin
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  commenter_name={comment.name}
                  // dateFrom={comment.createdAt}
                  dateFrom={comment.createdAt.substring(0, 25)}
                  onClick={() => setActiveComment(comment, index)}
                />
                {/* ))} */}
              </aside>
            </>
          ))}
      </div>
      {/* ============================= */}
      {currentComment ? (
        <div id="my-modal" className="modal modal-open">
          <div className="modal-box">
            <div className="flex flex-col">
              {/* <div> */}
              <h4 className="text-lg font-semibold mb-5">Commentaire</h4>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Texte:</strong>
                </label>{" "}
                {currentComment.text}
              </div>
              <div className="flex flex-col mb-5">
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentComment.published ? "Published" : "Pending"}
              </div>
              <div className="flex">
                <Link
                  to={"/comments/" + currentComment.id}
                  className="badge badge-warning text-lg"
                >
                  Editer
                </Link>
              </div>
              {/* </div> */}
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
