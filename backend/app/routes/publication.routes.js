module.exports = (app) => {
  const { authJwt } = require("../middleware");
  const publications = require("../controllers/publication.controller.js");

  var router = require("express").Router();

  // Create a new Publication
  router.post("/", publications.create);

  // Retrieve all Publication
  router.get("/", publications.findAll);

  // Retrieve all published Publication
  router.get("/published", publications.findAllPublished);

  // Retrieve a single Publication with comments inside
  router.get("/withcomments/:id", publications.findByPk);

  // Retrieve a single Publication with id
  router.get("/:id", publications.findOne);

  // Update a Publication with id
  router.put("/:id", publications.update);

  // Delete a Publication with id
  router.delete("/:id", publications.delete);

  // Delete all Publication
  router.delete("/", publications.deleteAll);

  app.use("/api/publications", router);
};
