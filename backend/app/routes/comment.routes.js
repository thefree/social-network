module.exports = (app) => {
  const { authJwt } = require("../middleware");
  const comments = require("../controllers/comment.controller.js");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Comment
  router.post("/", [authJwt.verifyToken], comments.create);

  // Retrieve all Comments
  router.get("/", comments.findAll);

  // Retrieve all Comments BY registered USER
  router.get("/byuser", [authJwt.verifyToken], comments.findAllByUser);

  // Retrieve all published Comments
  router.get("/published", comments.findAllPublished);

  // Retrieve a single Comment with id
  router.get("/:id", comments.findOne);

  // Update a Comment with id
  router.put("/:id", [authJwt.verifyToken], comments.update);

  // Delete a Comment with id
  router.delete("/:id", [authJwt.verifyToken], comments.delete);

  // Delete all Comment
  router.delete("/", [authJwt.verifyToken], comments.deleteAll);

  app.use("/api/comments", router);
};
