import { current } from "daisyui/colors";
import React, { useState, useEffect } from "react";
import PublicationDataService from "../services/PublicationService";
import AuthService from "../services/auth.service";

const AddPublication = () => {
  const initialPublicationState = {
    id: null,
    title: "",
    description: "",
    myfile: "",
    published: false,
  };
  const [publication, setPublication] = useState(initialPublicationState);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentFile, setCurrentFile] = useState();

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

  const handleInputFileChange = (event) => {
    setCurrentFile(event.target.files[0]);
  };

  const savePublication = async () => {
    // var data = {
    //   title: publication.title,
    //   description: publication.description,
    //   myfile: publication.myfile,
    //   userId: currentUser.id,
    // };

    const formdata = new FormData();
    formdata.append("title", publication.title);
    formdata.append("description", publication.description);
    // formdata.append("myfile", publication.myfile);
    formdata.append("userId", currentUser.id);
    formdata.append("currentFile", currentFile);

    // for (var value of formdata.values()) {
    //   console.log(value);
    // }

    PublicationDataService.create(formdata)
      .then((response) => {
        setPublication({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        // setCurrentFile(response.data.currentFile);
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
            <h4 className="text-success my-5">Succès: Insertion Réussie !</h4>
            <button className="btn btn-success mb-10" onClick={newPublication}>
              Ajouter Publication
            </button>
          </div>
        ) : (
          <>
            <form>
              <div className="my-5">
                <div className="form-control">
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

                <div className="form-control">
                  <label htmlFor="description">Text</label>
                  <textarea
                    // type="text"
                    // className="form-control"
                    className="textarea h-24 textarea-bordered"
                    id="description"
                    required
                    value={publication.description}
                    onChange={handleInputChange}
                    name="description"
                    rows="4"
                    cols="50"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="myfile">Ajouter une image</label>
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
              </div>
            </form>
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