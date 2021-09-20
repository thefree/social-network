import React, { useState, useEffect } from "react";
import CommentDataService from "../services/CommentService";

const Comment = (props) => {
  const initialCommentState = {
    id: null,
    publicationId: null,
    name: null,
    text: "",
  };
  const [currentComment, setCurrentComment] = useState(initialCommentState);
  const [message, setMessage] = useState("");

  const getComment = (id) => {
    CommentDataService.get(id)
      .then((response) => {
        setCurrentComment(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComment(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentComment({ ...currentComment, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentComment.id,
      text: currentComment.text,
      //   name: currentComment.description,
      published: status,
    };

    CommentDataService.update(currentComment.id, data)
      .then((response) => {
        setCurrentComment({ ...currentComment, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateComment = () => {
    CommentDataService.update(currentComment.id, currentComment)
      .then((response) => {
        console.log(response.data);
        setMessage("The comment was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteComment = () => {
    CommentDataService.remove(currentComment.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/publications");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentComment ? (
        <div className="max-w-md mx-auto my-5 p-10 card bg-base-200">
          <h4 className="text-2xl my-10">Edition: Commentaire</h4>
          <form>
            <div className="form-control">
              <label htmlFor="text" className="label">
                <span className="label-text">Commentaire</span>
              </label>
              <textarea
                // type="text"
                className=""
                id="text"
                name="text"
                value={currentComment.text}
                onChange={handleInputChange}
                rows="5"
                cols="50"
                maxLength="250"
              ></textarea>
            </div>
            <div className="my-5">
              <label>
                <strong>Status: </strong>
              </label>
              {currentComment.published ? "Published" : "Pending"}
            </div>
          </form>

          <div>
            {currentComment.published ? (
              <button
                className="badge badge-secondary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-secondary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-warning mr-2"
              onClick={deleteComment}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-primary"
              onClick={updateComment}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Comment...</p>
        </div>
      )}
    </div>
  );
};

export default Comment;
