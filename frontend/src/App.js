import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
// import PublicationsHome from "./components/PublicationsHome";
import PublicationsList from "./components/PublicationsList";
import AddPublication from "./components/AddPublication";
import Publication from "./components/Publication";
import PublicationPost from "./components/PublicationPost";
import Comment from "./components/Comment";
import CommentsList from "./components/CommentsList";
import UsersList from "./components/UsersList";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  // console.log("INFOS USER", currentUser);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden space-y-4 mx-auto">
      <Menu
        showModeratorBoard={showModeratorBoard}
        showAdminBoard={showAdminBoard}
        currentUser={currentUser}
        logOut={logOut}
      />

      <div>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          {/* <Route exact path="/publicationsHome" component={PublicationsHome} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route exact path="/publications" component={PublicationsList} />
          <Route exact path="/addPub" component={AddPublication} />
          <Route path="/publications/:id" component={Publication} />
          <Route path="/post/:id" component={PublicationPost} />
          <Route path="/comments/:id" component={Comment} />
          <Route path="/comments" component={CommentsList} />
          <Route path="/users" component={UsersList} />
        </Switch>
      </div>

      <Footer />

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
