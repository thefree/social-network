import { current } from "daisyui/colors";
import React, { useState } from "react";
// import PublicationDataService from "../services/PublicationService";
import PublicationDataService from "../services/PublicationService";
import AuthService from "../services/auth.service";

const AddPublication = () => {
  const initialPublicationState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [publication, setPublication] = useState(initialPublicationState);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPublication({ ...publication, [name]: value });
  };

  const savePublication = () => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    var data = {
      title: publication.title,
      description: publication.description,
      userId: currentUser.id,
    };

    PublicationDataService.create(data)
      .then((response) => {
        setPublication({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPublication = () => {
    setPublication(initialPublicationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Ajout Réussi!</h4>
          <button className="btn btn-success" onClick={newPublication}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={publication.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Text</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={publication.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={savePublication} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPublication;
