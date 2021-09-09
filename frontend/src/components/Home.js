import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PubItem from "./PubItem";
import PublicationDataService from "../services/PublicationService";

const Home = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    retrievePublications();
  }, []);

  const retrievePublications = () => {
    PublicationDataService.getAll()
      .then((response) => {
        setPublications(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Liste Publications
          </h1>
        </div>
      </header>
      <main>
        {publications.map((publication, index) => (
          <PubItem
            key={index}
            id={publication.id}
            title={publication.title}
            description={publication.description}
            // publishername={publication.user.username}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
