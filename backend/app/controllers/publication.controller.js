// const { user } = require("../models");
const { authJwt } = require("../middleware");
const db = require("../models");

const Publication = db.publications;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Publications
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const publication = req.file
    ? {
        title: req.body.title,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        userId: req.body.userId,
        name: req.body.name,
      }
    : { ...req.body };

  // Save Publications in the database

  Publication.create(publication)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Publication.",
      });
    });
};

// Retrieve all Publications from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Publication.findAll({
    include: { model: User, as: "user" },
    // where: condition,
    where: { published: true },
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publication.",
      });
    });
};

// Retrieve all Publications By USER from the database. (Utilisateurs ENREGISTRÉS)
exports.findAllByUser = async (req, res) => {
  const userid = req.userId;
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  var isModOrAdm = await authJwt.isModOrAdm(userid);

  if (isModOrAdm) {
    Publication.findAll({
      include: { model: User, as: "user" },
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
    Publication.findAll({
      include: { model: User, as: "user" },
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

// Find a single Publications with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Publication.findByPk(id, { include: { model: User, as: "user" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Publication with id=" + id,
      });
    });
};

exports.findByPk = (req, res) => {
  const id = req.params.id;

  // Publication.findByPk(id, { include: ["comments"] });
  Publication.findByPk(id, { include: ["comments", "user"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Publication with id=" + id,
      });
    });
};

// Update a Publications by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const publication = req.file
    ? {
        title: req.body.title,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Publication.update(publication, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Publication with id=${id}. Maybe Publication was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Publication with id=" + id,
      });
    });
};

// Delete a Publications with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Publication.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Publication with id=${id}. Maybe Publication was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Publication with id=" + id,
      });
    });
};

// Delete all Publications from the database.
exports.deleteAll = (req, res) => {
  Publication.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Publication were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publications.",
      });
    });
};

// From USER TOKEN: Delete all Publications By USER from the database.
exports.deleteAllByUser = (req, res) => {
  const userid = req.userId;

  Publication.destroy({
    where: { userId: userid },
    truncate: false,
  })
    .then((nums) => {
      // res.send({ message: `${nums} Publication were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publications.",
      });
    });
};

// From MOD OR ADMIN - Delete all Publications By USER ID from the database.
exports.deleteAllByUserID = (req, res) => {
  const userid = req.params.id;
  Publication.destroy({
    where: { userId: userid },
    truncate: false,
  })
    .then((nums) => {
      // res.send({ message: `${nums} Publication were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publications.",
      });
    });
};

// find all published Publications
exports.findAllPublished = (req, res) => {
  Publication.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publications.",
      });
    });
};
