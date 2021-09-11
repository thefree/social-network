import React, { useState, useEffect } from "react";
import PubItemPost from "./PubItemPost";
import PubItemPostComment from "./PubItemPostComment";
import PublicationDataService from "../services/PublicationService";

const PublicationPost = (props) => {
  const [currentPublication, setCurrentPublication] = useState({});
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
          // publishername={publishername.username}
          publishername={currentPublication.user?.username}
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
          <p>
            Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut
            adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea
            quasi eligendi. Saepe velit autem minima.
          </p>
          <div className="modal-action">
            <a href="#" className="btn btn-primary">
              Accept
            </a>
            <a href="#" className="btn">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationPost;
