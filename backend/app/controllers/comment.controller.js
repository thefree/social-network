const { authJwt } = require("../middleware");
const db = require("../models");

const Comment = db.comments;
const User = db.user;
const Publication = db.publications;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Comment
  const comment = {
    userId: req.body.userId,
    name: req.body.name,
    text: req.body.text,
    publicationId: req.body.publicationId,
    published: req.body.published ? req.body.published : false,
  };
  // Save Comment in the database
  Comment.create(comment)
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  const text = req.query.text;
  var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;

  Comment.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

// Retrieve all Comments By USER from the database. (Utilisateurs ENREGISTRÉS)
exports.findAllByUser = async (req, res) => {
  const userid = req.userId;
  const text = req.query.text;
  var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;

  var isModOrAdm = await authJwt.isModOrAdm(userid);

  if (isModOrAdm) {
    Comment.findAll({
      // include: { model: User, as: "user" },
      include: [
        { model: User, as: "user" },
        { model: Publication, as: "publication" },
      ],
      where: condition,
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("Probème sur isModOrAdm");
      });
  }

  if (!isModOrAdm) {
    Comment.findAll({
      include: [
        { model: User, as: "user" },
        { model: Publication, as: "publication" },
      ],

      // include: { all: true },

      where: {
        [Op.and]: [condition, { userId: userid }],
      },
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("Probème sur NOT isModOrAdm");
      });
  }
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Comment were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
      });
    });
};

// Delete all Comments By USER from the database.
exports.deleteAllByUser = (req, res) => {
  const userid = req.userId;

  Comment.destroy({
    where: { userId: userid },
    truncate: false,
  })
    .then((nums) => {
      // res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
      });
    });
};

// Delete all Comments By USER from the database.
exports.deleteAllPubIsNull = () => {
  // const userid = req.userId;

  Comment.destroy({
    where: { publicationId: null },
    truncate: false,
  })
    .then((nums) => {
      // res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
      });
    });
};

// find all published Comment
exports.findAllPublished = (req, res) => {
  Comment.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};
