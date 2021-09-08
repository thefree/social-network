import React, { useState, useEffect } from "react";
import PubItemPost from "./PubItemPost";
import PublicationDataService from "../services/PublicationService";

const PublicationPost = (props) => {
  const [currentPublication, setCurrentPublication] = useState({});
  const [publishername, setPublishername] = useState({});

  const getPublication = async (id) => {
    await PublicationDataService.get(id)
      .then((response) => {
        setCurrentPublication(response.data);
        setPublishername(response.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPublication(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
          publishername={publishername.username}
        />
      </main>
    </div>
  );
};

export default PublicationPost;
