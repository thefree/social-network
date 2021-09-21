import React, { useState, useEffect } from "react";
import PubItemPost from "./PubItemPost";
import PubItemPostComment from "./PubItemPostComment";
import PublicationDataService from "../services/PublicationService";
import CommentDataService from "../services/CommentService";
import AuthService from "../services/auth.service";

const PublicationPost = (props) => {
  const initialCommentState = {
    id: null,
    publicationId: null,
    name: null,
    text: "",
  };
  const [currentPublication, setCurrentPublication] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [comment, setComment] = useState(initialCommentState);

  // const [publishername, setPublishername] = useState({});
  // const [comments, setComments] = useState([]);

  const getPublication = async (id) => {
    // await PublicationDataService.get(id)
    await PublicationDataService.getWithComments(id)
      .then((response) => {
        setCurrentPublication(response.data);
        // setPublishername(response.data.user);
        // setComments(response.data.comments);
        console.log("WITHCOMMENTS", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const saveComment = async () => {
    var data = {
      name: currentUser.username,
      text: comment.text,
      publicationId: currentPublication.id,
      userId: currentUser.id,
    };

    CommentDataService.create(data)
      .then((response) => {
        setComment({
          id: response.data.id,
          publicationId: response.data.publicationId,
          name: response.data.name,
          text: response.data.text,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPublication(props.match.params.id);
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [props.match.params.id]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <header className="bg-white shadow">
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentPublication.title}
          </h1>
        </div>
      </header>
      <main>
        <PubItemPost
          id={currentPublication.id}
          title={currentPublication.title}
          description={currentPublication.description}
          // publishername={publishername.username}
          publishername={currentPublication.user?.username}
          image={currentPublication.imageUrl}
        />
      </main>
      <aside className="">
        <h2 className="mx-10 text-2xl font-bold text-gray-900">Commentaires</h2>
        {currentPublication.comments?.map((comment, index) => (
          <PubItemPostComment
            key={index}
            id={comment.id}
            text={comment.text}
            commenter_name={comment.name}
          />
        ))}
      </aside>

      <div id="my-modal" className="modal">
        <div className="modal-box">
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>Ajout Commentaire Réussi!</h4>
                {/* <button className="btn btn-success" onClick={newPublication}>
                  Add
                </button> */}
              </div>
            ) : (
              <div>
                {/* <div className="form-control my-5"> */}
                <div className="form-group my-5">
                  <h2 className="text-2xl">Ajouter un commentaire</h2>
                  <label htmlFor="text" className="label">
                    <span className="text-groupoblue">
                      Saisissez votre commentaire
                    </span>
                  </label>
                  <input
                    type="text"
                    // placeholder="..."
                    className="form-control input input-lg input-bordered"
                    id="text"
                    required
                    value={comment.text}
                    onChange={handleInputChange}
                    name="text"
                  />
                </div>

                <button
                  onClick={saveComment}
                  className="btn border-transparent bg-groupoblue hover:bg-groupopink hover:scale-110 hover:border-transparent"
                >
                  Envoyer
                </button>
              </div>
            )}
          </div>
          <div className="modal-action">
            {/* <a href="#" className="btn btn-primary">
              Accept
            </a> */}
            <a href="#" className="btn">
              Fermer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationPost;
