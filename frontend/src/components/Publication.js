import React, { useState, useEffect } from "react";
// import PublicationDataService from "../services/PublicationService";
import PublicationDataService from "../services/PublicationService";

const Publication = (props) => {
  const initialPublicationState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentPublication, setCurrentPublication] = useState(
    initialPublicationState
  );
  const [message, setMessage] = useState("");

  const getPublication = (id) => {
    PublicationDataService.get(id)
      .then((response) => {
        setCurrentPublication(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPublication(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPublication({ ...currentPublication, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentPublication.id,
      title: currentPublication.title,
      description: currentPublication.description,
      published: status,
    };

    PublicationDataService.update(currentPublication.id, data)
      .then((response) => {
        setCurrentPublication({ ...currentPublication, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePublication = () => {
    PublicationDataService.update(currentPublication.id, currentPublication)
      .then((response) => {
        console.log(response.data);
        setMessage("The publication was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePublication = () => {
    PublicationDataService.remove(currentPublication.id)
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
      {currentPublication ? (
        <div className="edit-form">
          <h4>Publication</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPublication.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPublication.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPublication.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPublication.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deletePublication}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePublication}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Publication...</p>
        </div>
      )}
    </div>
  );
};

export default Publication;
