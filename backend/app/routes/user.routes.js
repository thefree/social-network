const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  //
  app.get("/api/test/user/withpub/:id", controller.userWithPub);
  //

  app.get(
    "/api/test/user",
    [authJwt.verifyToken, authJwt.isUserModAdm],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // GET users list
  app.get(
    "/api/test/list",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAll
  );

  app.delete(
    // "/api/test/user/:id",
    "/api/test/user/",
    authJwt.verifyToken,
    controller.deleteUser
  );

  app.delete(
    "/api/test/user/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteUserById
  );
};
