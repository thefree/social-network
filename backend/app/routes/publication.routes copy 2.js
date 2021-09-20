module.exports = (app) => {
  const { authJwt } = require("../middleware");
  const publications = require("../controllers/publication.controller.js");
  const multer = require("../middleware/multer-config");
  // const express = require("express");
  // const path = require("path");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.use("/images", express.static(path.join(__dirname, "images")));

  var router = require("express").Router();

  // Create a new Publication
  // router.post("/", publications.create);
  router.post("/", [authJwt.verifyToken], multer, publications.create);

  // router.post("/nofile", publications.create);
  router.post("/nofile", [authJwt.verifyToken], publications.create);

  // Retrieve all Publication
  router.get("/", publications.findAll);

  // Retrieve all Publication - getAllByUser
  router.get("/byuser", [authJwt.verifyToken], publications.findAllByUser);

  // Retrieve all published Publication
  router.get("/published", publications.findAllPublished);

  // Retrieve a single Publication with comments inside
  router.get("/withcomments/:id", publications.findByPk);

  // Retrieve a single Publication with id
  router.get("/:id", publications.findOne);

  // Update a Publication with id
  router.put("/:id", [authJwt.verifyToken], multer, publications.update);

  // Update a Publication with id
  router.put("/nofile/:id", [authJwt.verifyToken], multer, publications.update);

  // Delete a Publication with id
  router.delete("/:id", publications.delete);

  // Delete all Publication
  router.delete("/", publications.deleteAll);

  app.use("/api/publications", router);
};
