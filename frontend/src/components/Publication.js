import React, { useState, useEffect } from "react";
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
  const [currentFile, setCurrentFile] = useState();
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

  const handleInputFileChange = (event) => {
    setCurrentFile(event.target.files[0]);
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
    let data = null;
    if (!currentFile) {
      data = {
        id: currentPublication.id,
        title: currentPublication.title,
        description: currentPublication.description,
        // userId: currentUser.id,
      };
    } else {
      data = new FormData();
      data.append("title", currentPublication.title);
      data.append("description", currentPublication.description);
      data.append("id", currentPublication.id);
      data.append("currentFile", currentFile);
    }

    PublicationDataService.update(currentPublication.id, data)
      .then((response) => {
        getPublication(currentPublication.id);
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
        // <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto my-5 p-10 card bg-base-200">
          <h4 className="text-2xl my-10">Edition: Publication</h4>
          <form>
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Titre</span>
              </label>
              <input
                type="text"
                className="input"
                id="title"
                name="title"
                value={currentPublication.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                id="description"
                name="description"
                value={currentPublication.description}
                onChange={handleInputChange}
              ></textarea>
              {/* <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPublication.description}
                onChange={handleInputChange}
              /> */}
            </div>
            {/* ============= GESTION IMAGE ================== */}
            <img
              src={currentPublication.imageUrl}
              className="max-w-md"
              alt=""
            />
            <div className="form-control">
              <label htmlFor="myfile">Ajouter ou remplacer une image</label>
              <input
                type="file"
                // className="form-control"
                className="form-control input input-md input-bordered"
                id="myfile"
                // required
                // value={currentFile}
                // onChange={handleInputChange}
                onChange={handleInputFileChange}
                name="myfile"
                accept="image/png, image/jpeg"
              />
            </div>
            {/* =============== FIN GESTION IMAGE ================ */}
            <div className="my-5">
              <label>
                <strong>Status: </strong>
              </label>
              {currentPublication.published ? "Published" : "Pending"}
            </div>
          </form>
          <div>
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
