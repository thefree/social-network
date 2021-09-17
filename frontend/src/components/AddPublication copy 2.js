import { current } from "daisyui/colors";
import React, { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPublication({ ...publication, [name]: value });
  };

  const savePublication = async () => {
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
    // <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
      {/* <h2 className="text-2xl">Ajouter une Publication</h2> */}
      <div className="hero bg-base-200 pt-5">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Ajouter une Publication</h1>
            <p className="mb-5 text-justify">
              Utilisez ce formulaire pour insérer vos publications et ce dans le
              respect des règles établies
            </p>
          </div>
        </div>
      </div>
      <div className="submit-form">
        {submitted ? (
          <div className="my-5">
            <h4 className="text-success my-5">Ajout Publication Réussi !</h4>
            <button className="btn btn-success mb-10" onClick={newPublication}>
              Ajouter Publication
            </button>
          </div>
        ) : (
          <>
            <div className="my-5">
              <div className="form-group">
                <label htmlFor="title">Titre Publication</label>
                <input
                  type="text"
                  // className="form-control"
                  className="form-control input input-md input-bordered"
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
                  // className="form-control"
                  className="form-control input input-lg input-bordered"
                  id="description"
                  required
                  value={publication.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
            </div>
            <button
              onClick={savePublication}
              className="btn border-transparent bg-groupoblue hover:bg-groupopink hover:scale-110 hover:border-transparent mb-5"
            >
              Ajouter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPublication;
